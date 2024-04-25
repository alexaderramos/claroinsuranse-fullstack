<?php

namespace App\Http\Requests\Courses;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="CourseCreateRequest",
 *     title="CourseCreateRequest",
 *     description="Course creation request",
 *     required={"name", "start_date", "end_date", "course_type_id"},
 *     @OA\Property(property="name", type="string", example="Course Name"),
 *     @OA\Property(property="start_date", type="string", format="date", example="2024-04-25"),
 *     @OA\Property(property="end_date", type="string", format="date", example="2024-05-25"),
 *     @OA\Property(property="course_type_id", type="integer", example=1)
 * )
 */
class CourseCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
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
