<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\_MembershipRequest;
use App\Services\MembershipService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\MembershipRequestResource;

class MembershipController extends Controller
{
    protected MembershipService $membershipService;

    public function __construct(MembershipService $membershipService)
    {
        $this->membershipService = $membershipService;
    }

    public function store(_MembershipRequest $request): JsonResponse
    {
        $membership = $this->membershipService
            ->submitApplication($request->validated());

        return response()->json([
            'message' => 'Application submitted successfully',
            'data' => [
                'id' => $membership->id,
                'status' => $membership->status
            ]
        ], 201);
    }

    public function index()
    {
        $membershipRequests = $this->membershipService->getAllRequests();

        return MembershipRequestResource::collection($membershipRequests);
    }

    public function approve(Request $request, int $id): JsonResponse
    {
        $admin = $request->user();

        if (!$admin) {
            abort(401, 'Unauthenticated.');
        }

        $membership = $this->membershipService->approveRequest(
            $id,
            $admin->id
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

        $membership = $this->membershipService->rejectRequest(
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
