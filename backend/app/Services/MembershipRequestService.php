<?php

namespace App\Services;

use App\Events\MembershipRequestReceived;
use App\Events\MembershipRequestRejected;
use App\Models\MembershipRequest;
use App\Services\MembershipRequest\StatusHandlers\ApprovedStatusHandler;
use App\Services\MembershipRequest\StatusHandlers\RejectedStatusHandler;
use App\Services\MembershipRequest\StatusHandlers\TrialStatusHandler;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use InvalidArgumentException;
use StatusHandlerInterface;

class MembershipRequestService
{
    public function submitApplication(array $data): MembershipRequest | null
    {
        $membershipRequest = null;

        DB::transaction(function () use (&$membershipRequest, $data) {
            // set default status
            $data['status'] = 'pending';

            // if user agreed to rules, set timestamp
            if (!empty($data['agreed_to_rules'])) {
                $data['agreed_at'] = now();
            }

            // create record
            $membershipRequest = MembershipRequest::create($data);

            event(new MembershipRequestReceived(($membershipRequest)));
        });

        return $membershipRequest;
    }

    public function getAllRequests(?string $status = null, ?string $search = null)
    {
        $query = MembershipRequest::query()
            ->latest()
            ->when(
                filled($status),
                fn($q) => $q->where('status', trim($status))
            )
            ->when(
                filled($search),
                function ($q) use ($search) {
                    $term = '%' . str_replace('%', '\\%', trim($search)) . '%';

                    $q->where(function ($sub) use ($term) {
                        $sub->where('first_name', 'like', $term)
                            ->orWhere('last_name', 'like', $term)
                            ->orWhere('email', 'like', $term)
                            ->orWhere('phone', 'like', $term)
                            ->orWhere('city', 'like', $term)
                            ->orWhere('province', 'like', $term);
                    });
                }
            );

        return $query->paginate(10);
    }

    public function updateMembershipRequestStatus(int $id, int $adminId, array $fields): MembershipRequest
    {
        return DB::transaction(function () use ($id, $adminId, $fields) {
            $status = $fields['status'];
            $adminNotes = $fields['admin_notes'];

            /* Get target membership request */
            $membershipRequest = MembershipRequest::whereKey($id)
                ->lockForUpdate()
                ->firstOrFail();

            /* No updates if no status change */
            if ($membershipRequest->status === $status) {
                return $membershipRequest;
            }

            /* Pick which Membership request status update handler to use */
            $handler = $this->resolveStatusHandler($status);

            /* Validate if possible to update */
            $handler->validate($membershipRequest, [$status, $adminNotes]);

            /* Update */
            $membershipRequest->update([
                'admin_notes' => $adminNotes,
                'status' => $status
            ]);

            /* Side effects after status update */
            $handler->handle($membershipRequest, [$status, $adminNotes]);

            /* Return updated membership request */
            return $membershipRequest->fresh();
        });
    }

    public function resolveStatusHandler(string $status): StatusHandlerInterface
    {
        /* List all status update handlers */
        $statusHandlerMapping = [
            'approved' => ApprovedStatusHandler::class,
            'rejected' => RejectedStatusHandler::class,
            'trial' => TrialStatusHandler::class
        ];

        /* Validate */
        if (!isset($statusHandlerMapping[$status])) {
            throw new InvalidArgumentException("Unknown status: {$status}");
        }

        /* Return instance */
        return app($statusHandlerMapping[$status]);
    }
}
