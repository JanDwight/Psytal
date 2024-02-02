<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TmpPreRegistrationRequest extends FormRequest
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
            'type_of_student' => 'string',
            'candidate_for_graduation' => 'boolean',
            'end_of_term_to_finnish_degree' => 'string',
            'term' => 'string',
            'start_of_school_year' => 'integer',
            'end_of_school_year' => 'integer',
            'year_level' => 'string',
            'student_school_id' => 'integer',
            'learners_reference_number' => 'integer',
            'degree' => 'string',
            'major' => 'string',
            'status' => 'string',
            'family_name' => 'string',
            'given_name' => 'string',
            'middle_name' => 'string',
            'maiden_name' => 'string',
            'date_of_birth' => 'date',
            'nationality' => 'string',
            'home_address' => 'string',
            'address_while_studying' => 'string',
            'contact_number' => 'integer',
            'email_address' => 'string',
            'contact_person_name' => 'string',
            'contact_person_number' => 'integer',
            'contact_person_address' => 'string',
            'contact_person_relationship' => 'string',
            'section' => 'string',
            'image' => 'string',
            'class_year' => 'integer',
            'last_school_attended' => 'string',
            'pre_reg_status' => 'string',
        ];
    }
}
