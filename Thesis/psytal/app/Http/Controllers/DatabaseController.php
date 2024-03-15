<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDO;
use PDOException;

class DatabaseController extends Controller
{
    public function databaseBackup(Request $request)
    {
        if (config('database.default') === 'mysql') {
            $result = $this->backupMySQLDatabase();
            return response()->json(['message' => 'Database backup completed successfully'], 200);
        } else {
            return response()->json(['error' => 'Unsupported database driver'], 500);
        }
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
    
            return response()->json(['message' => 'Database restored successfully']);
        } catch (PDOException $e) {
            // Handle database connection or query execution errors
            return response()->json(['error' => 'Database restore failed: ' . $e->getMessage()], 500);
        }
    }

    public function databaseDelete()
    {
        // Implement database delete logic
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
        $backupFileName = 'backup_' . date('Y-m-d_H-i-s') . '.sql';

        // Directory to store backups
        $backupDirectory = storage_path('backups');

        // Create the directory if it doesn't exist
        if (!file_exists($backupDirectory)) {
            mkdir($backupDirectory, 0755, true);
        }

        // Backup file path
        $backupFilePath = $backupDirectory . '/' . $backupFileName;

        try {
            // Connect to the database
            $dsn = "mysql:host=$host;port=$port;dbname=$databaseName";
            $pdo = new PDO($dsn, $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Get all table names in the database
            $statement = $pdo->prepare("SHOW TABLES");
            $statement->execute();
            $tables = $statement->fetchAll(PDO::FETCH_COLUMN);

            // Open the backup file for writing
            $backupFile = fopen($backupFilePath, 'w');

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
            return true;
        } catch (PDOException $e) {
            // Handle any errors
            echo "Backup failed: " . $e->getMessage();
            return false;
        }
    }
}
