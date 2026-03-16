<?php

namespace App\Services\MembershipRequest\StatusHandlers;

use App\Events\MembershipRequestRejected;
use App\Models\MembershipRequest;

class RejectedStatusHandler implements StatusHandlerInterface
{
    public function validate(MembershipRequest $membershipRequest, array $inputs)
    {
        if (!in_array($membershipRequest->status, ['pending', 'trial'], true)) {
            return throw new InvalidStatusTransitionException("Status cannot be rejected if previous status is not 'pending'");
        }
    }

    public function handle(MembershipRequest $membershipRequest, array $inputs)
    {
        event(new MembershipRequestRejected($membershipRequest));
    }
}
