<?php

namespace App\Services\MembershipRequest\StatusHandlers;

use App\Models\MembershipRequest;

interface StatusHandlerInterface
{
    public function validate(MembershipRequest $membershipRequest, array $inputs);
    public function handle(MembershipRequest $membershipRequest, array $inputs);
}
