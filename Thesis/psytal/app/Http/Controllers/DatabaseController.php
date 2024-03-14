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

    public function databaseRestore()
    {
        // Implement database restore logic
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
                // Export table structure
                $statement = $pdo->prepare("SHOW CREATE TABLE $table");
                $statement->execute();
                $createTableSQL = $statement->fetchColumn(1);
                fwrite($backupFile, "-- Table structure for table `$table`\n\n");
                fwrite($backupFile, "$createTableSQL;\n\n");

                // Export table data
                $statement = $pdo->prepare("SELECT * FROM $table");
                $statement->execute();
                $rows = $statement->fetchAll(PDO::FETCH_ASSOC);
                if ($rows) {
                    fwrite($backupFile, "-- Data dump for table `$table`\n\n");
                    foreach ($rows as $row) {
                        $rowValues = implode("', '", array_map([$pdo, 'quote'], $row));
                        fwrite($backupFile, "INSERT INTO $table VALUES ('$rowValues');\n");
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
