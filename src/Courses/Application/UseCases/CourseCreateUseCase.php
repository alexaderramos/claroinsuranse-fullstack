<?php

namespace Src\Courses\Application\UseCases;

use App\Models\Course;

use Illuminate\Http\Request;
use Src\Courses\Application\Validators\CourseCreateValidator;

class CourseCreateUseCase
{
    private CourseCreateValidator $validator;

    public function __construct(
        CourseCreateValidator $validator
    )
    {
        $this->validator = $validator;
    }

    public function execute(CourseCreateValidator $request)
    {

//        $data = $this->validator->validate($request);

//        $course = Course::create($data);

    }
}
