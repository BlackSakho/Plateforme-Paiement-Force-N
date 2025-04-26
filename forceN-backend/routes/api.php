<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\PresenceController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MessageController;
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
    Route::put('/presences/{id}/validate-by-finance', [PresenceController::class, 'validateByFinance']);
    Route::get('/statistics', [StatisticsController::class, 'getStatistics']);
    Route::get('/user-presences', [PresenceController::class, 'getUserPresences']);
    Route::get('/missions', [MissionController::class, 'index']); // Récupérer toutes les missions
    Route::post('/missions', [MissionController::class, 'store']); // Créer une mission
    Route::patch('/missions/{id}/status', [MissionController::class, 'updateStatus']); // Mettre à jour le statut
    Route::put('/missions/{id}/status', [MissionController::class, 'updateStatus']); // Mettre à jour le statut
    Route::get('/mentors', [UserController::class, 'getMentors']);
    Route::get('/mentor/missions', [MissionController::class, 'getMentorMissions']);
    Route::get('/consultant-validated-presences', [PresenceController::class, 'getConsultantValidatedPresences']);
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/invoices/generate', [InvoiceController::class, 'generateInvoice']);
    Route::post('/invoices/{id}/send', [InvoiceController::class, 'sendToMentor']);
    Route::get('/invoices/{id}', [InvoiceController::class, 'show']);
    Route::middleware('auth:sanctum')->get('/presences/validated', [PresenceController::class, 'getValidatedPresencesForAccountant']);
    Route::get('/messages/{user}', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::get('/invoices/by-mentor/{mentorId}', [InvoiceController::class, 'getInvoicesByMentor']);



});
