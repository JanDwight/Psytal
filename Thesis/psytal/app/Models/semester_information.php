<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class semester_information extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'semester_information';
    protected $fillable = [
        'start_of_prereg',
        'end_of_prereg',
        'start_of_semester',
        'end_of_semester',
        'start_of_school_year',
        'end_of_school_year',
        'semester',
        'open_pre_reg'
    ];
}
