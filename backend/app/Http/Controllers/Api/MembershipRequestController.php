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

    /**
     * Save membership request
     */
    public function store(_MembershipRequest $request): JsonResponse
    {
        /* Validate */
        $membership = $this->membershipRequestService
            ->submitApplication($request->validated());

        /* Respond */
        return response()->json([
            'message' => 'Application submitted successfully',
            'data' => [
                'id' => $membership->id,
                'status' => $membership->status
            ]
        ], 201);
    }

    /**
     * List membership requests
     */
    public function index(Request $request)
    {
        /* Validate */
        $status = $request->string('status')->trim()->toString();
        $allowedStatuses = ['pending', 'approved', 'rejected', 'waitlisted', 'trial'];
        if (!in_array($status, $allowedStatuses, true)) {
            $status = null;
        }

        /* Set search */
        $search = $request->string('search')->trim()->toString();

        /* Call service */
        $membershipRequests = $this->membershipRequestService->getAllRequests(
            $status,
            $search
        );

        /* Respond */
        return MembershipRequestResource::collection($membershipRequests);
    }

    /**
     * Update membership request status
     */
    public function updateMembershipRequestStatus(Request $request, int $id)
    {
        /* Validate inputs */
        $validated = $request->validate([
            'admin_notes' => ['nullable', 'string', 'max:1000'],
            'status' => ['required', 'in:pending,trial,rejected,approved,waitlist']
        ]);

        /* Update Logic */
        $updatedMembershipRequest = $this->membershipRequestService->updateMembershipRequestStatus(
            $id,
            $request->user()->id,
            $validated,
        );

        /* Return response */
        return response()->json([
            'message' => 'Application status updated.',
            'data' => new MembershipRequestResource($updatedMembershipRequest),
        ]);
    }
}
