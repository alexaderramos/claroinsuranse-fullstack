<?php

namespace Src\Courses\Application\Validators;

use Illuminate\Foundation\Http\FormRequest;

class CourseCreateValidator extends FormRequest
{


    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|max:50',
            'start_date' => 'required|date|date_format:Y-m-d',
            'end_date' => 'required|date|date_format:Y-m-d',
            'course_type_id' => 'required|exists:course_types,id'
        ];
    }
}
