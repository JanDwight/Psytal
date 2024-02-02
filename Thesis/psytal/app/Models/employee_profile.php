<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class employee_profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'employee_id',
        'last_name',
        'first_name',
        'middle_name',
    ];
}
