<?php

use App\Models\MembershipRequest;

interface StatusHandlerInterface
{
    public function validate(MembershipRequest $membershipRequest): void;
    public function handle(MembershipRequest $membershipRequest): void;
}
