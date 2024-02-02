<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class archive extends Model
{
    use HasFactory;
    protected $table = 'archives'; // Specify the database table name

    protected $primaryKey = 'id'; // Specify the primary key column name (if it's not 'id')

    protected $fillable = [
        'item_id',
        'item_name',
        'item_type',
        'origin_table',
        'archiver_id',
        'archiver_name',
        'archiver_role',
        // Add other columns here
    ];
}
