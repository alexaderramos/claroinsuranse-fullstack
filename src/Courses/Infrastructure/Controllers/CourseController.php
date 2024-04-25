<?php

namespace Src\Courses\Infrastructure\Controllers;

use App\Models\Course;

class CourseController
{
    public function index(): \Illuminate\Http\JsonResponse
    {
        $courses = Course::all();
        return response()->json([
            'data' => $courses,
            'message' => ''
        ]);
    }
}
