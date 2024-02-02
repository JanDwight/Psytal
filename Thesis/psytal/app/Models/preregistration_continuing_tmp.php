<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class preregistration_continuing_tmp extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'start_of_school_year',
        'end_of_school_year',
        'last_name',
        'first_name',
        'middle_name',
        'maiden_name',
        'type_of_student',
        'year_level',
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
        'section',
        'class_year',
        'health_facility_registered',
        'depended_on_parents_health_facility',
        'vaccination_status',
        'digital_communication_and_literacy',
        'level_of_digital_literacy',
        'avail_free_higher_education',
        'voluntarily_contribute',
        'amount',
        'pre_reg_status',
    ];

/**
 * Indicates if the model should be timestamped.
 *
 * @var bool
 */
public $timestamps = true;
}
