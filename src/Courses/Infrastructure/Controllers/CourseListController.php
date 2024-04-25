<?php

namespace Src\Courses\Infrastructure\Controllers;

use App\Models\Course;
use Src\Courses\Application\UseCases\CourseListUseCase;

class CourseListController
{

    private CourseListUseCase $listCourses;

    public function __construct(
        CourseListUseCase $listCourses
    )
    {
        $this->listCourses = $listCourses;

    }

    public function __invoke(): \Illuminate\Http\JsonResponse
    {
        $courses = $this->listCourses->execute();
        return response()->json([
            'data' => $courses,
            'message' => ''
        ]);
    }

}
