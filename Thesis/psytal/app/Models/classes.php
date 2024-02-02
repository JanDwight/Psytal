<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class classes extends Model
{
    use HasFactory;

    protected $table = 'classes'; // Specify the database table name >>>causes error in attaching

    protected $primaryKey = 'class_id'; // Specify the primary key column name (if it's not 'id') >>>causes error in attaching

    // Define the fillable fields that can be mass-assigned
    protected $fillable = [
        'class_year',
        'semester',
        'class_code',
        'course_code',
        'course_title',
        'units',
        'course_type',
        'class_section',
        'instructor_name',
        'archived', // Add the 'archived' field to the fillable array <><><>
        // Add other columns here time and day
    ];

    public function student_profile(): BelongsTo
    {
        return $this->belongsTo(student_classes::class, 'student_profile_id');
    }

    // public function students()
    // {
    //     //return $this->belongsToMany(student_profile::class);

    //     return $this->belongsToMany(student_profile::class)
    //     ->withPivot([
    //         'class_code',
    //         'course_code',
    //         'course_title',
    //         'units',
    //         'grade',
    //         'course_type',
    //         'bcac',
    //     ]);
    // }
}
