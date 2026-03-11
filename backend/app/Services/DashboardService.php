<?php

namespace App\Services;

use App\Models\MembershipRequest;

class DashboardService
{
    public function __construct() {}

    public static function countPendingRequests()
    {
        $total = MembershipRequest::where('status', 'pending')->count();

        // Current date to previous 7th day
        $current = MembershipRequest::where('status', 'pending')
            ->where('created_at', '>=', now()->subDays(7))
            ->count();

        // previous 7th day to 14th day
        $previous = MembershipRequest::where('status', 'pending')
            ->whereBetween('created_at', [now()->subDays(14), now()->subDays(7)])
            ->count();

        // Calculate change based on percentage
        $change = $previous === 0
            ? 0
            : (($current - $previous) / $previous) * 100;

        return [
            'total' => $total,
            'change' => round($change, 1)
        ];
    }
}
