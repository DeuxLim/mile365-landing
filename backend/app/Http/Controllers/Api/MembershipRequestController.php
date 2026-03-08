<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\_MembershipRequest;
use App\Services\MembershipRequestService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\MembershipRequestResource;

class MembershipRequestController extends Controller
{
    protected MembershipRequestService $membershipRequestService;

    public function __construct(MembershipRequestService $membershipRequestService)
    {
        $this->membershipRequestService = $membershipRequestService;
    }

    public function store(_MembershipRequest $request): JsonResponse
    {
        $membership = $this->membershipRequestService
            ->submitApplication($request->validated());

        return response()->json([
            'message' => 'Application submitted successfully',
            'data' => [
                'id' => $membership->id,
                'status' => $membership->status
            ]
        ], 201);
    }

    public function index(Request $request)
    {
        $status = $request->string('status')->trim()->toString();
        $allowedStatuses = ['pending', 'approved', 'rejected', 'waitlisted'];
        if (!in_array($status, $allowedStatuses, true)) {
            $status = null;
        }

        $search = $request->string('search')->trim()->toString();

        $membershipRequests = $this->membershipRequestService->getAllRequests(
            $status,
            $search
        );

        return MembershipRequestResource::collection($membershipRequests);
    }

    public function approve(Request $request, int $id): JsonResponse
    {
        $admin = $request->user();

        if (!$admin) {
            abort(401, 'Unauthenticated.');
        }

        $validated = $request->validate([
            'admin_notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $membership = $this->membershipRequestService->approveRequest(
            $id,
            $admin->id,
            $validated['admin_notes'] ?? null
        );

        return response()->json([
            'message' => 'Application approved',
            'data' => new MembershipRequestResource($membership),
        ], 200);
    }

    public function reject(Request $request, int $id): JsonResponse
    {
        $admin = $request->user();

        if (!$admin) {
            abort(401, 'Unauthenticated.');
        }

        $validated = $request->validate([
            'admin_notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $membership = $this->membershipRequestService->rejectRequest(
            $id,
            $admin->id,
            $validated['admin_notes'] ?? null
        );

        return response()->json([
            'message' => 'Application rejected',
            'data' => new MembershipRequestResource($membership),
        ], 200);
    }
}
