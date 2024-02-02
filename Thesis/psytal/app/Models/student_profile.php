<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class student_profile extends Model
{
    use HasFactory;

    protected $primaryKey = 'student_profile_id';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
            'user_id',
            'start_of_school_year',
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
            'section',
            'pre_reg_status',
            'archived'
    ];

/**
 * Indicates if the model should be timestamped.
 *
 * @var bool
 */
public $timestamps = true;

    public function classes() : HasMany
    {
        return $this->hasMany(classes::class, 'class_id');
    }

    //student has many subjects
    // public function classes()
    //     {
    //        return $this->belongsToMany(classes::class)->withPivot([
    //             'class_code',
    //             'course_code',
    //             'course_title',
    //             'units',
    //             'grade',
    //             'course_type',
    //             'bcac',
    //         ]); 
    //     }

}
