<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class student_classes extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_profile_id',
        'instructor_profile',
        'class_id',
        'grade',
        'ongoing',
        'archived',
    ];

}
