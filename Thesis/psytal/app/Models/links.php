<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class links extends Model
{
    use HasFactory;

    protected $table = 'links'; // Specify the database table name

    protected $primaryKey = 'id'; // Specify the primary key column name (if it's not 'id')
    protected $fillable = [
        'class_code',
        'class_description',
        'instructor_name',
        'url',
        'archived',

    ];
}
