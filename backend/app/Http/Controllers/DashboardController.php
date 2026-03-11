<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'stats' => [
                'Pending Requests' => DashboardService::countPendingRequests(),
            ]
        ], 200);
    }
}
