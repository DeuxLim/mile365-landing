<?php

namespace App\Services;

use App\Models\MembershipRequest;

class DashboardService
{
    public function __construct() {}

    public static function countPendingRequests()
    {
        return MembershipRequest::where('status', 'pending')->count();
    }
}
