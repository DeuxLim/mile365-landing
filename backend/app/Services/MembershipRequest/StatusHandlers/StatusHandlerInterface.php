<?php

use App\Models\MembershipRequest;

interface StatusHandlerInterface
{
    public function validate(MembershipRequest $membershipRequest, array $inputs);
    public function handle(MembershipRequest $membershipRequest, array $inputs);
}
