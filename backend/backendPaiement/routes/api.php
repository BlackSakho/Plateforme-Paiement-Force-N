<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
Route::get('/profile', [AuthController::class, 'profile']);
Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/test-api', function () {
    return response()->json(['message' => 'API fonctionne !']);
});