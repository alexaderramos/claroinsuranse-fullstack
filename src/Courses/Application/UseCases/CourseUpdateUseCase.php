<?php

namespace Src\Courses\Application\UseCases;

use App\Models\Course;

use Illuminate\Http\Request;
use Src\Courses\Application\Validators\CourseCreateValidator;

class CourseUpdateUseCase
{
    private CourseCreateValidator $validator;

    public function __construct(
        CourseCreateValidator $validator
    )
    {
        $this->validator = $validator;
    }

    public function execute(int $id, CourseCreateValidator $request)
    {
        $data = $this->validator->validate([
            'name' => 'required|max:50',
            'start_date' => 'required|date|date_format:Y-m-d',
            'end_date' => 'required|date|date_format:Y-m-d|after:start_date'
        ]);

        $course = Course::findOrFail($id);

        return $course->update($data);

    }
}
