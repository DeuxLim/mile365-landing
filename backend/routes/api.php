<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MembershipRequestController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\DashboardController;

Route::get('/letsgo365', function () {
    return response()->json([
        'message' => 'Welcome to the API!'
    ], 200);
});

Route::post('/admin/login', [AuthController::class, 'login'])->middleware('throttle:10,1');
Route::middleware(['auth:sanctum', 'can:admin_access'])->prefix('admin')->group(function () {
    /* Dashboard */
    Route::get('/dashboard/stats', [DashboardController::class, 'index']);

    /* User / Admin */
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    /* Membership Requests */
    Route::get('/membership-requests', [MembershipRequestController::class, 'index'])->middleware('can:membership_requests_view');
    Route::patch('/membership-requests/{id}/status', [MembershipRequestController::class, 'updateMembershipRequestStatus'])->middleware('can:membership_requests_review');

    /* Members */
    Route::get('/members', [MemberController::class, 'index'])->middleware('can:members_view');
});
