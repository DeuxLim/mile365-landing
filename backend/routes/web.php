<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MembershipController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MemberController;

Route::get('/letsgo365', function () {
    return response()->json([
        'message' => 'Welcome to the API!'
    ], 200);
});

Route::post('/membership-requests', [MembershipController::class, 'store']);
Route::post('/admin/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    /* Membership Requests */
    Route::get('/membership-requests', [MembershipController::class, 'index']);
    Route::patch('/membership-requests/{id}/approve', [MembershipController::class, 'approve']);
    Route::patch('/membership-requests/{id}/reject', [MembershipController::class, 'reject']);

    /* Members */
    Route::apiResource('/members', MemberController::class);
});
