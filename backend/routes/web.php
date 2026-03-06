<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MembershipController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MemberController;
/* use App\Mail\MembershipRequestSubmitted;
use App\Models\MembershipRequest;

Route::get('/letsgo365', function () {
    return response()->json([
        'message' => 'Welcome to the API!'
    ], 200);
});

Route::get('/mailable', function () {
    $membershipRequest = MembershipRequest::find(1);

    return new  MembershipRequestSubmitted($membershipRequest);
}); */

Route::post('/membership-requests', [MembershipController::class, 'store']);
Route::post('/admin/login', [AuthController::class, 'login'])->middleware('throttle:10,1');
Route::middleware(['auth:sanctum', 'can:admin_access'])->prefix('admin')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    /* Membership Requests */
    Route::get('/membership-requests', [MembershipController::class, 'index'])->middleware('can:membership_requests_view');
    Route::patch('/membership-requests/{id}/approve', [MembershipController::class, 'approve'])->middleware('can:membership_requests_review');
    Route::patch('/membership-requests/{id}/reject', [MembershipController::class, 'reject'])->middleware('can:membership_requests_review');

    /* Members */
    Route::get('/members', [MemberController::class, 'index'])->middleware('can:members_view');
});
