<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class employee_profile extends Model
{
    use HasFactory;
    protected $table = 'employee_profiles'; // Specify the database table name

    protected $primaryKey = 'id'; // Specify the primary key column name (if it's not 'id')

    protected $fillable = [
        'user_id',
        'employee_id',
        'last_name',
        'first_name',
        'middle_name',
        'email_address',
        'role',
        'archived'
    ];
}
