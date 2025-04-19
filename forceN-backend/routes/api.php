<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\PresenceController;
use App\Http\Controllers\StatisticsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/* Route::middleware('auth:sanctum')->get('/users', function (Request $request) {
    return $request->user();
}); */

Route::post('/register', [AuthController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::get('/update', [AuthController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/missions', [MissionController::class, 'mission']);
    Route::post('/presence', [PresenceController::class, 'store']);
    Route::get('/users', [AuthController::class, 'user']);
    Route::get('/presences', [PresenceController::class, 'index']);
    Route::patch('/presences/{id}/validate/consultant', [PresenceController::class, 'validateByConsultant']);
    Route::patch('/presences/{id}/validate/certificate-manager', [PresenceController::class, 'validateByCertificateManager']);
    Route::patch('/presences/{id}/validate/finance', [PresenceController::class, 'validateByFinance']);
    Route::get('/statistics', [StatisticsController::class, 'getStatistics']);
    Route::get('/user-presences', [PresenceController::class, 'getUserPresences']);
});
