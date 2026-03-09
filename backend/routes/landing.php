<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MembershipRequestController;
use App\Http\Controllers\Landing\GalleryController;

Route::post('/membership-requests', [MembershipRequestController::class, 'store'])
    ->middleware('throttle:20,1');

Route::get('/landing/gallery', [GalleryController::class, 'index']);
