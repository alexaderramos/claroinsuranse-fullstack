<?php


use App\Http\Api\Auth\AuthController;
use App\Http\Api\{
    CourseController,
    StudentController
};
use \Illuminate\Support\Facades\Route;
use OpenApi\Annotations as OA;


Route::prefix('auth')->group(function () {
    Route::middleware('guest:api')->group(function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);


    });

    Route::middleware('auth:api')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
        Route::post('refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
    });
});


Route::middleware('auth:api')
    ->prefix('admin')
    ->group(function () {

        Route::get('courses/types', [CourseController::class, 'types']);
        Route::apiResource('courses', CourseController::class);
        Route::get('courses/{course}/students', [CourseController::class, 'students']);
        Route::post('courses/unsubscribe', [CourseController::class, 'unsubscribe']);

        Route::apiResource('students', StudentController::class);
        Route::get('students/{student}/courses', [StudentController::class, 'courses']);
        Route::post('students/{student}/enroll-massive', [StudentController::class, 'enrollMassive']);
        Route::post('students/{student}/enroll', [StudentController::class, 'enroll']);
        Route::post('students/unsubscribe', [StudentController::class, 'unsubscribe']);

        Route::prefix('analytics')->group(function () {
            Route::get('courses-top', [\App\Http\Api\AnalyticsController::class, 'coursesTop']);
            Route::get('students-top', [\App\Http\Api\AnalyticsController::class, 'studentsTop']);
            Route::get('totales', [\App\Http\Api\AnalyticsController::class, 'totales']);

        });

    });
