<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class logs extends Model
{
    use HasFactory;

    protected $table = 'logs'; // Specify the database table name

    protected $primaryKey = 'id'; // Specify the primary key column name (if it's not 'id')

    // Define the fillable fields that can be mass-assigned
    protected $fillable = [
        'action_taken',
        'item_type',
        'item_name',
        'item_origin',
        'user_name',
        'user_type',
        'user_id',
        // Add other columns here
    ];
}
