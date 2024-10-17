<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\EventScheduleController;
use App\Http\Controllers\Api\V1\TeamController;
use App\Http\Controllers\Api\V1\LiveUpdateController;
use App\Http\Controllers\Api\V1\UserAdminController;

Route::prefix('v1')->group(function () {    

    # Event routes
    Route::apiResource('event', EventScheduleController::class);

    # Team routes
    Route::get('/team/standings', [TeamController::class, 'teamStandings']);
    Route::apiResource('team', TeamController::class);

    # Live update routes
    Route::get('/liveupdate', [LiveUpdateController::class, 'getLiveUpdate']);

    # User admin routes
    Route::post('/login', [UserAdminController::class, 'login']);
    Route::post('/register', [UserAdminController::class, 'register']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [UserAdminController::class, 'logout']);
        Route::post('/refresh', [UserAdminController::class, 'refresh']);
    });
});