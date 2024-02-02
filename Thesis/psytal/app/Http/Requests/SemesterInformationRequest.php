<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SemesterInformationRequest extends FormRequest
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
            'start_of_prereg' => 'required|string',
            'end_of_prereg' => 'required|string',
            'start_of_semester' => 'required|string',
            'end_of_semester' => 'required|string',
            'start_of_school_year' => 'required|string',
            'end_of_school_year'=> 'required|string',
            'semester' => 'required|string',
            'open_pre_reg' => 'required|boolean'
        ];
    }
}
