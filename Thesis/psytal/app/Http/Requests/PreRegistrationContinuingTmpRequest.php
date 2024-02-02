<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PreRegistrationContinuingTmpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'start_of_school_year' => 'required|integer',
            'end_of_school_year' => 'required|integer',
            'last_name' => 'required|string',
            'first_name' => 'required|string',
            'middle_name' => 'required|string',
            'maiden_name' => 'string',
            'type_of_student' => 'string',
            'year_level' => 'required|string',
            'degree' => 'required|string',
            'major' => 'required|string',
            'candidate_for_graduation' => 'required|string',
            'end_of_term_to_finnish_degree' => 'required|string',
            'last_of_term_to_finnish_degree' => 'required|string',
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
            'class_year' => 'integer',
            'health_facility_registered' => 'boolean',
            'depended_on_parents_health_facility' => 'boolean',
            'vaccination_status' => 'string',
            'digital_communication_and_literacy' => 'string',
            'level_of_digital_literacy' => 'string',
            'avail_free_higher_education' => 'boolean',
            'voluntarily_contribute' => 'boolean',
            'amount' => 'string',
            'pre_reg_status' => 'string',
        ];
    }
}
