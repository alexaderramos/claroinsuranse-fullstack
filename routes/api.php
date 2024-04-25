<?php


use App\Http\Api\Auth\LoginController;
use App\Http\Api\{
    CourseController,
    StudentController
};
use \Illuminate\Support\Facades\Route;


Route::middleware('guest:api')->group(function () {
    Route::post('login', LoginController::class);

});


Route::middleware('auth:api')
    ->prefix('admin')
    ->group(function () {
        Route::apiResource('courses', CourseController::class);
        Route::get('courses/{course}/students', [CourseController::class, 'students']);

        Route::apiResource('students', StudentController::class);
        Route::get('students/{student}/courses', [StudentController::class, 'courses']);
        Route::post('students/{student}/enroll-massive', [StudentController::class, 'enrollMassive']);
        Route::post('students/{student}/enroll', [StudentController::class, 'enroll']);

        Route::prefix('analytics')->group(function () {
            Route::get('courses-top',[\App\Http\Api\AnalyticsController::class,'coursesTop']);
            Route::get('students-top',[\App\Http\Api\AnalyticsController::class,'studentsTop']);
            Route::get('totales',[\App\Http\Api\AnalyticsController::class,'totales']);

//            Route::get('students-by-course', [AnalyticsController::class, 'studentsByCourse']);
//            Route::get('courses-by-student', [AnalyticsController::class, 'coursesByStudent']);
        });

    });