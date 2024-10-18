<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\EventScheduleController;
use App\Http\Controllers\Api\V1\TeamController;
use App\Http\Controllers\Api\V1\LiveUpdateController;
use App\Http\Controllers\Api\V1\UserController;

Route::prefix('v1')->group(function () {
    // Public routes
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);

    // Live update routes
    Route::get('/liveupdate', [LiveUpdateController::class, 'getLiveUpdate']);

    Route::get('/team/standings', [TeamController::class, 'teamStandings']);
    Route::get('/team', [TeamController::class, 'index']);
    Route::get('/team/{team}', [TeamController::class, 'show']);

    // Event routes
    Route::get('/event', [EventScheduleController::class, 'index']);
    Route::get('/event/{event}', [EventScheduleController::class, 'show']);

    // Protected routes
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [UserController::class, 'logout']);

        // Event routes
        Route::post('/event', [EventScheduleController::class, 'store']);
        Route::put('/event/{event}', [EventScheduleController::class, 'update']);
        Route::delete('/event/{event}', [EventScheduleController::class, 'destroy']);

        // Team routes
        Route::post('/team', [TeamController::class, 'store']);
        Route::put('/team/{team}', [TeamController::class, 'update']);
        Route::delete('/team/{team}', [TeamController::class, 'destroy']);
    });
});
