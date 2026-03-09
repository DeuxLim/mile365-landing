<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MembershipRequestController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemberController;

// Testing Route For Emails
/* use App\Mail\MembershipRequestApproved;
use App\Mail\MembershipRequestReceived;
use App\Mail\MembershipRequestRejected;
use App\Mail\MembershipRequestSent;
use App\Models\MembershipRequest;

Route::get('/letsgo365', function () {
    return response()->json([
        'message' => 'Welcome to the API!'
    ], 200);
});

Route::get('/mailable', function () {
    $membershipRequest = MembershipRequest::find(1);

    return new MembershipRequestRejected($membershipRequest);
}); */

Route::post('/admin/login', [AuthController::class, 'login'])->middleware('throttle:10,1');
Route::middleware(['auth:sanctum', 'can:admin_access'])->prefix('admin')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    /* Membership Requests */
    Route::get('/membership-requests', [MembershipRequestController::class, 'index'])->middleware('can:membership_requests_view');
    Route::patch('/membership-requests/{id}/approve', [MembershipRequestController::class, 'approve'])->middleware('can:membership_requests_review');
    Route::patch('/membership-requests/{id}/reject', [MembershipRequestController::class, 'reject'])->middleware('can:membership_requests_review');

    /* Members */
    Route::get('/members', [MemberController::class, 'index'])->middleware('can:members_view');
});
