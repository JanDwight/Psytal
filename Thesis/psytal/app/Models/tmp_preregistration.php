<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tmp_preregistration extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'student_profile_id',
        'type_of_student',
        'candidate_for_graduation',
        'end_of_term_to_finnish_degree',
        'term',
        'start_of_school_year',
        'end_of_school_year',
        'year_level',
        'learners_reference_number',
        'degree',
        'major',
        'status',
        'family_name',
        'given_name',
        'middle_name',
        'maiden_name',
        'date_of_birth',
        'nationality',
        'home_address',
        'address_while_studying',
        'contact_number',
        'email_address',
        'contact_person_name',
        'contact_person_number',
        'contact_person_address',
        'contact_person_relationship',
        'section',
        'image',
        'class_year',
        'last_school_attended',
        'pre_reg_status',
    ];
}
