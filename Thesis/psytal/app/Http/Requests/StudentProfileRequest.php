<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentProfileRequest extends FormRequest
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
            'user_id' => 'integer',
            'start_of_school_year' => 'required|integer',
            'end_of_school_year' => 'required|integer',
            'student_school_id' => 'integer',
            'learners_reference_number' => 'integer',
            'last_name' => 'required|string',
            'first_name' => 'required|string',
            'middle_name' => 'required|string',
            'maiden_name' => 'string',
            'type_of_student' => 'string',
            'year_level' => 'string',
            'academic_classification' => 'string',
            'last_school_attended' => 'string',
            'address_of_school_attended' => 'string',
            'degree' => 'required|string',
            'major' => 'string',
            'candidate_for_graduation' => 'string',
            'end_of_term_to_finnish_degree' => 'string',
            'last_of_term_to_finnish_degree' => 'string',
            'date_of_birth' => 'required|date',
            'citizenship' => 'required|string',
            'ethnicity' => 'required|string',
            'contact_number' => 'required|integer',
            'place_of_birth' => 'required|string',
            'sex_at_birth' => 'required|string',
            'special_needs' =>'string',
            'email_address' => 'required|string',
            'home_address' => 'required|string',
            'address_while_studying' => 'required|string',
            'contact_person_name' => 'required|string',
            'contact_person_number' => 'required|integer',
            'contact_person_address' => 'required|string',
            'contact_person_relationship' => 'required|string',
            'section' => 'string',
            'image' => 'string',
            'pre_reg_status' => 'string',
            'archived' => 'boolean'
        ];  
    }
}
