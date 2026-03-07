<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MembershipRequestController;

Route::get('/letsgo365', function () {
    return response()->json([
        'message' => 'Welcome to the API!'
    ], 200);
});

Route::post('/membership-requests', [MembershipRequestController::class, 'store'])
    ->middleware('throttle:20,1');
