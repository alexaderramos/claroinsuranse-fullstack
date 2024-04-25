<?php

namespace App\Http\Requests\Students;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StudentUpdateRequest extends FormRequest
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
            'name' => 'required|max:100',
            'last_name' => 'required|max:100',
            'age' => 'required|integer|min:18|max:100',
            'identification' => [
                'required',
                Rule::unique('students', 'identification')->ignore($this->route('student')),
            ],
            'email' => [
                'required',
                'email',
                Rule::unique('students', 'email')->ignore($this->route('student')),
            ],
        ];
    }
}
