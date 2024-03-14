<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Process\Process;

class DatabaseController extends Controller
{
    public function databaseBackup(Request $request) {
        try {
            // Define the path where you want to store the backup file
            $backupPath = storage_path('app/backup.sql');
    
            // Execute Laravel artisan command to perform database backup
            Artisan::call('backup:run', [
                '--only-db' => true,  // Backup only the database
                '--destination' => 'local',  // Store the backup locally
                '--destinationPath' => $backupPath,  // Specify the backup path
            ]);
    
            // Return response indicating success
            return response()->json(['message' => 'Database backup completed.']);
        } catch (\Exception $e) {
            // Return response indicating failure along with error message
            return response()->json(['message' => 'Database backup failed. Error: ' . $e->getMessage()], 500);
        }
    }

    public function databaseRestore() {
       
    }

    public function databaseDelete() {

    }
}
