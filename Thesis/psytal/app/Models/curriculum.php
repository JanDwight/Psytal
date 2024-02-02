<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class curriculum extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $fillable = [
        'class_year',
        'semester',
        'course_code',
        'units',
        'course_title',
        'hoursperWeek',
        'course_type',
        'preReq',
        'archived',
    ];
}
