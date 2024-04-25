<?php


use \Illuminate\Support\Facades\Route;
use Src\Auth\Infrastructure\Controllers\LoginController;


Route::middleware('guest:api')->group(function () {
    Route::post('login', LoginController::class);

});


Route::middleware('auth:api')
    ->prefix('admin')
    ->group(function () {
        Route::get('courses', [\Src\Courses\Infrastructure\Controllers\CourseController::class, 'index']);

    });
