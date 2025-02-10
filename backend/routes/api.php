<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\FacebookAuthController;
use App\Http\Controllers\UserController;

// Test route
Route::get('/ping', function() {
    return response()->json(['message' => 'pong']);
});

// Auth routes (no middleware)
Route::post('/auth/facebook', [FacebookAuthController::class, 'authenticate']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (with sanctum middleware)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/movies', [MovieController::class, 'index']);
    Route::get('/movies/{id}', [MovieController::class, 'show']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::get('/user', [UserController::class, 'show']);
});

// Add this temporary test route
Route::get('/test', function() {
    return response()->json(['message' => 'API is working']);
});
