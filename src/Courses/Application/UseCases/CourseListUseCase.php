<?php

namespace Src\Courses\Application\UseCases;

use App\Models\Course;

class CourseListUseCase
{
    public function execute()
    {

        return Course::all();

    }
}
