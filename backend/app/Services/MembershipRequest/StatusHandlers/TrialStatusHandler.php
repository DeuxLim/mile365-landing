<?php

namespace App\Services\MembershipRequest\StatusHandlers;

use App\Events\MembershipRequestTrial;
use App\Models\MembershipRequest;

class TrialStatusHandler implements StatusHandlerInterface
{
    public function validate(MembershipRequest $membershipRequest, array $inputs)
    {
        if (!$membershipRequest->status === "pending") {
            return throw new InvalidStatusTransitionException("Status cannot be approved if previous status is not 'pending'");
        }
    }

    public function handle(MembershipRequest $membershipRequest, array $inputs)
    {
        event(new MembershipRequestTrial($membershipRequest));
    }
}
