<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use App\Models\logs;
use PDO;
use PDOException;

class DatabaseController extends Controller
{
    public function databaseBackup(Request $request)
    {
        if (config('database.default') === 'mysql') {

            $result = $this->backupMySQLDatabase();

            return response()->json(['message' => "Database backup '{$result}' created successfully", 'success' => true]);
        } else {
            return response()->json(['message' => 'Unsupported database driver. Requires SQL.', 'success' => false]);
        }
    }

    public function autoBackup()
    {
        //$auto = $this->backupMySQLDatabase();

        //return response()->json(['message' => 'Database backup auto generated successfully!', 'success' => true]);
    }

    public function databaseRestore(Request $request)
    {
        $request->validate([
            'backup_file' => 'required|file|max:10240',// Adjust max file size as needed
        ]);
    
        // Move the uploaded file to a temporary location
        $backupFile = $request->file('backup_file');
        $backupFileName = $backupFile->getClientOriginalName();
        $backupFilePath = $backupFile->storeAs('temp', $backupFileName);
    
        try {
            // Connect to the database using PDO
            $pdo = new PDO('mysql:host='.env('DB_HOST').';dbname='.env('DB_DATABASE'), env('DB_USERNAME'), env('DB_PASSWORD'));
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
            // Read SQL statements from the backup file and execute them
            $sqlStatements = file_get_contents(storage_path('app/' . $backupFilePath));
            $pdo->exec($sqlStatements);
    
            // Once database is restored, you can delete the temporary file
            unlink(storage_path('app/' . $backupFilePath));

            //$this->storeLog('Database restored', 'SQL Restore', $backupFileName, 'file import');
    
            return response()->json(['message' => 'Database restored successfully!', 'success' => true]);
        } catch (PDOException $e) {
            // Handle database connection or query execution errors
            return response()->json(['message' => 'Database restore failed. ', 'success' => false]);
        }
    }

    protected function backupMySQLDatabase()
    {
        // Database connection parameters
        $host = config('database.connections.mysql.host');
        $port = config('database.connections.mysql.port');
        $databaseName = config('database.connections.mysql.database');
        $username = config('database.connections.mysql.username');
        $password = config('database.connections.mysql.password');

        // Backup file name
        $backupFileName = 'psytal_backup_' . date('Y-m-d_H-i-s') . '.sql';

        // Directory to store backups (relative path from the public directory)
        $backupDirectory = 'backups';

        // Create the directory if it doesn't exist in the public directory
        if (!file_exists(public_path($backupDirectory))) {
            mkdir(public_path($backupDirectory), 0755, true);
        }

        // Backup file path (relative to the backup directory)
        $backupFilePath = $backupDirectory . '/' . $backupFileName;

        $this->storeLog('Backup for database created', 'SQL Backup', $backupFileName, $backupFilePath);

        try {
            // Connect to the database
            $dsn = "mysql:host=$host;port=$port;dbname=$databaseName";
            $pdo = new PDO($dsn, $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Get all table names in the database
            $statement = $pdo->prepare("SHOW TABLES");
            $statement->execute();
            $tables = $statement->fetchAll(PDO::FETCH_COLUMN);

            // List of tables to filter out
            $tablesToFilterOut = ['personal_access_tokens', 'password_reset_tokens', 'failed_jobs']; // Replace with your actual table names

            // Filter out tables
            $tables = array_diff($tables, $tablesToFilterOut);

            // Open the backup file for writing
            $backupFile = fopen($backupFilePath, 'w');

            // Loop through each table and delete its contents
            foreach ($tables as $table) {
                // Delete data from the table
                fwrite($backupFile, "DELETE FROM `$table`;\n");
            }

            // Remove 'archives' table if it exists and add it to the end
            /*if (($key = array_search('archives', $tables)) !== false) {
                unset($tables[$key]);
                $tables[] = 'archives';
            }*/

            if (($key = array_search('users', $tables)) !== false) {
                unset($tables[$key]); // Remove 'users' if it exists
            }
            array_unshift($tables, 'users'); // Add 'users' to the beginning of the array

            // Insert a separator between delete and insert statements
            fwrite($backupFile, "\n");

            // Loop through each table and export its structure and data
            foreach ($tables as $table) {
                // Export table data
                $statement = $pdo->prepare("SELECT * FROM $table");
                $statement->execute();
                $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
                if ($rows) {
                    fwrite($backupFile, "-- Data dump for table `$table`\n\n");
                    foreach ($rows as $row) {
                        // Quote and escape each value in the row
                        $escapedValues = [];
                        foreach ($row as $value) {
                            $escapedValues[] = $pdo->quote($value);
                        }
                        // Implode the escaped values with commas
                        $rowValues = implode(", ", $escapedValues);
                        fwrite($backupFile, "INSERT INTO $table VALUES ($rowValues);\n");
                    }
                    fwrite($backupFile, "\n");
                }
            }

            // Close the backup file
            fclose($backupFile);

            // Return success
            return $backupFileName;
        } catch (PDOException $e) {
            // Handle any errors
            echo "Backup failed: " . $e->getMessage();
            return false;
        }
    }

    public function listBackupFiles()
    {
        // Directory where backups are stored
        $backupDirectory = ('backups');

        // Check if the directory exists
        if (!file_exists($backupDirectory)) {
            return response()->json(['error' => 'Backup directory not found'], 404);
        }

        // Scan the backup directory for files
        $backupFiles = scandir($backupDirectory);

        // Remove "." and ".." from the list
        $backupFiles = array_filter($backupFiles, function ($file) {
            return !in_array($file, ['.', '..']);
        });

        // Reverse the array to arrange files in backwards fashion
        $backupFiles = array_reverse($backupFiles);

        // Reset array keys to start from 0
        $backupFiles = array_values($backupFiles);

        // Return the list of backup files
        return response()->json(['backup_files' => $backupFiles], 200);
    }

    public function backupDelete(Request $request)
    {
        $selectedItems = $request->input('selectedItems');
        $backupDirectory = 'backups'; // Relative path from the public directory

        try {
            foreach ($selectedItems as $fileName) {
                $filePath = public_path($backupDirectory . '/' . $fileName);
                if (File::exists($filePath)) {
                    File::delete($filePath);
                    $this->storeLog('Backup file/s deleted', 'SQL backup file', $fileName, $filePath);
                }
            }

            return response()->json(['message' => 'Selected items deleted successfully', 'success' => true]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete selected items: ', 'success' => false]);
        }
    }

    public function download($filename)
    {
        $path = public_path('backups/' . $filename);

        if (!file_exists($path)) {
            abort(404);
        }

        return Response::download($path);
    }

    public function databaseDelete()
    {
        // Implement database delete logic
    }

    public function rollbackDB (Request $request){
        $publicPath = public_path('backups/');

        $sqlFiles = File::glob($publicPath . '/*.sql');

        usort($sqlFiles, function($a, $b) {
            return filemtime($b) - filemtime($a);
        });

        if (!empty($sqlFiles)) {
            // Get the path of the most recent SQL file
            $latestSqlFile = $sqlFiles[0];

            // Get database connection parameters
            $host = config('database.connections.mysql.host');
            $port = config('database.connections.mysql.port');
            $databaseName = config('database.connections.mysql.database');
            $username = config('database.connections.mysql.username');
            $password = config('database.connections.mysql.password');

            // Connect to the database using PDO
            try {
                $dsn = "mysql:host=$host;port=$port;dbname=$databaseName";
                $pdo = new PDO($dsn, $username, $password);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                // Read the SQL file contents
                $sql = file_get_contents($latestSqlFile);

                // Execute the SQL queries to rollback the database
                $pdo->exec($sql);

                return response()->json(['message' => 'Database Rolled Back Successfully!', 'success' => true]);
            } catch (PDOException $e) {
                // Handle PDO exceptions
                return response()->json(['message' => 'Rollback Error! PDO Exception.', 'success' => false]);
            }
        } else {
            return response()->json(['message' => 'No SQL backup files found!', 'success' => false]);
        }
    }

    public function latestBackup (Request $request){
        $publicPath = public_path('backups/');
        
        $sqlFiles = File::glob($publicPath . '/*.sql');

        usort($sqlFiles, function($a, $b) {
            return filemtime($b) - filemtime($a);
        });

        // If there are SQL files found, rollback using the most recent one
        if (!empty($sqlFiles)) {
            // Get the path of the most recent SQL file
            $latestSqlFile = $sqlFiles[0];
            
            // Extract only the file name from the path
            $latestSqlFileName = basename($latestSqlFile);

            return response()->json($latestSqlFileName);
        } else {
            return response()->json('No Backup Found');
        }
    }

    public function storeLog($actionTaken, $itemType, $itemName, $itemOrigin)
    {
        // Create a new Log instance
        $logs = logs::create([
            'action_taken' => $actionTaken,
            'item_type' => $itemType,
            'item_name' => $itemName,
            'item_origin' => $itemOrigin,
            'user_name' => auth()->user()->name,
            'user_id' => auth()->user()->id,
            'user_type' => auth()->user()->role,
        ]);

        // Optionally, you can return the created log instance
        return $logs;
    }
}
