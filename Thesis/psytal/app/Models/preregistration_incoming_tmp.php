<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class preregistration_incoming_tmp extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
            'start_of_school_year',
            'user_id',
            'end_of_school_year',
            'student_school_id',
            'learners_reference_number',
            'last_name',
            'first_name',
            'middle_name',
            'maiden_name',
            'type_of_student',
            'year_level',
            'academic_classification',
            'last_school_attended',
            'address_of_school_attended',
            'degree',
            'major',
            'candidate_for_graduation',
            'end_of_term_to_finnish_degree',
            'last_of_term_to_finnish_degree',
            'date_of_birth',
            'citizenship',
            'ethnicity',
            'contact_number',
            'place_of_birth',
            'sex_at_birth',
            'special_needs',
            'email_address',
            'home_address',
            'address_while_studying',
            'contact_person_name',
            'contact_person_number',
            'contact_person_address',
            'contact_person_relationship',
            'health_facility_registered',
            'parent_health_facility_dependent',
            'vaccination_status',
            'technology_level',
            'digital_literacy',
            'avail_free_higher_education',
            'voluntary_contribution',
            'contribution_amount',
            'complied_to_admission_policy',
            'section',
            'pre_reg_status',
            'student_status',
        ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;
}
