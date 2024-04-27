<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="UnsubscribeUserCourseRequest",
 *     title="Unsubscribe User from Course Request",
 *     required={"course_id", "student_id"},
 *     @OA\Property(
 *         property="course_id",
 *         type="integer",
 *         description="ID of the course",
 *         example="1"
 *     ),
 *     @OA\Property(
 *         property="student_id",
 *         type="integer",
 *         description="ID of the student",
 *         example="1"
 *     ),
 * )
 */
class UnsubscribeUserCourseRequest extends FormRequest
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
            'course_id' => ['required', 'integer', 'exists:courses,id'],
            'student_id' => ['required', 'integer', 'exists:students,id'],
        ];
    }

    public function messages()
    {
        return [
            'course_id.required' => 'The course_id field is required.',
            'course_id.integer' => 'The course_id field must be an integer.',
            'course_id.exists' => 'The selected course_id is invalid.',
            'student_id.required' => 'The student_id field is required.',
            'student_id.integer' => 'The student_id field must be an integer.',
            'student_id.exists' => 'The selected student_id is invalid.',
        ];
    }
}
