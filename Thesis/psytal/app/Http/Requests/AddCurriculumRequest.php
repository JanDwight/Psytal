<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddCurriculumRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'class_year' => 'required|string',
            'semester' => 'required|string',
            'course_code' => 'required|string',
            'course_title' => 'required|string',
            'units' => 'required|integer',
            'hoursperWeek' => 'required|integer',
            'course_type' => 'string',
            'preReq' => 'string',
        ];
    }
}
