<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\archive;
use App\Models\logs;
use Illuminate\Support\Facades\File; //<><><><><>

class ArchiveController extends Controller
{
    /**
    * Display a listing of the resource.
    * rem was here
    */
   public function index()
   {
       // Retrieve all logs starting from the most recent
       $archives = archive::orderBy('created_at', 'desc')->get();
       return response()->json($archives);
   }

   /**
    * Show the form for creating a new resource.
    */
   public function create()
   {
       //
   }

   /**
    * Store a newly created resource in storage.
    */
   public function store(Request $request)
   {
       //
   }

   /**
    * Display the specified resource.
    */
   public function show(archive $archives)
   {
       // order by descending order (most recent first)
       // send three items only
       //$archives = archive::orderBy('created_at', 'desc')->take(3)->get();
       $archives = archive::orderBy('created_at', 'desc')->get();
       return response()->json($archives);
   }

   /**
    * Show the form for editing the specified resource.
    */
   public function edit(archive $archives)
   {
       //
   }

   /**
    * Update the specified resource in storage.
    */
   public function update(Request $request, archive $archives)
   {
       //
   }

   /**
    * Remove the specified resource from storage.
    */
   public function destroy(archive $archives)
   {
       //
   }
   // BACKUP BACKUP BACKUP
   public function backupArchive(Request $request)
   {
    try {
        // Retrieve the array of selected item IDs from the request payload
        $selectedItems = $request->input('selectedItems');

        // Query the archives table to select specific columns
        $archivedItems = archive::whereIn('id', $selectedItems)
            ->select('id', 'item_id', 'item_name', 'item_type', 'origin_table')
            ->get();

        // Create a backup file on the desktop
        $backupFileName = 'psytal_backup_' . date('Y-m-d_H-i-s') . '.txt';
        $backupFilePath = public_path() . '/' . $backupFileName; //change to the desktop/device of the admin???

        // Open the backup file for writing
        $backupFile = fopen($backupFilePath, 'w');

        if ($backupFile === false) {
            // Handle the case where the backup file cannot be opened
            return response()->json(['message' => 'Error opening the backup file'], 500);
        }

        // Process the archived items and write their contents to the backup file
        foreach ($archivedItems as $archivedItem) {
            // Determine the source model class based on 'item_type' and 'origin_table'
            $modelClass = 'App\\Models\\' . ucfirst($archivedItem->item_type);

            // Check if the model class exists
            if (class_exists($modelClass)) {
                // Use 'item_id' to find the item in the source table
                $sourceItem = $modelClass::find($archivedItem->item_id);

                if ($sourceItem) {
                    // Write the contents of the source item to the backup file
                    fwrite($backupFile, "Backup From Table: {$archivedItem->origin_table}\n");
                    fwrite($backupFile, "Contents: " . json_encode($sourceItem) . "\n");

                    // Update the 'archived' column to 0 in the source item
                    $sourceItem->delete(); //uncomment after all functions are done
                }
            }
        }

        // Close the backup file
        fclose($backupFile);

        //---Send file to frontend---
            // Read the contents of the backup file
            $backupFileContents = file_get_contents($backupFilePath);

            // Set the appropriate headers for file download
            $headers = [
                'Content-Type' => 'text/plain',
                'Content-Disposition' => 'attachment; filename="' . $backupFileName . '"',
            ];
        //---Send file to frontend---

        // Force delete the selected items from the 'archives' table
        archive::whereIn('id', $selectedItems)->forceDelete(); //uncomment after all functions are done

        $string_id = implode(',', $selectedItems);

        //logs call
        $this->storeLog('Archive/s back up created', 'archive', $string_id , 'archives');

        // Respond with a success message
        //return response()->json(['message' => 'Items backed up and deleted successfully']);
        return response()->file($backupFilePath, $headers);
    } catch (\Exception $e) {
        // Handle exceptions, e.g., log the error
        return response()->json(['message' => 'Error processing items'], 500);
    }
   }
   // RESTORE RESTORE RESTORE
   public function returnArchive(Request $request)
    {
        try {
            // Retrieve the array of selected item IDs from the request payload
            $selectedItems = $request->input('selectedItems');
    
            // Query the archives table to select specific columns
            $archivedItems = archive::whereIn('id', $selectedItems)
                ->select('id', 'item_id', 'item_name', 'item_type', 'origin_table')
                ->get();
    
            // Process the archived items and restore them to their source tables
            foreach ($archivedItems as $archivedItem) {
                // Determine the source model class based on 'item_type' and 'origin_table'
                $modelClass = 'App\\Models\\' . ucfirst($archivedItem->item_type);
                $archivedItemItemID = $archivedItem->item_id;
                
                // Check if the model class exists
                if (class_exists($modelClass)) {
                    return response()->json(['message' => 'Items restored successfully', 'data' => $archivedItemItemID]);
                    // Use 'item_id' to find the item in the source table
                    $sourceItem = $modelClass::find($archivedItemItemID);
    
                    // If the source item is found, you can update it as needed
                    if ($sourceItem) {
                        // Update the 'archived' column to 0 in the source item
                        $sourceItem->update(['archived' => 0]);
                    }
                }
            }

            // Force delete the selected items from the 'archives' table
            archive::whereIn('id', $selectedItems)->forceDelete();

            $string_name = collect($archivedItems)->pluck('item_name')->implode(',');

            //logs call
            $this->storeLog('Archive/s restored', 'archive', $string_name , 'archives');
    
            // After processing the selectedItems, return a response indicating success

        } catch (\Exception $e) {
            // Handle exceptions, e.g., log the error
            return response()->json(['message' => 'Error restoring items'], 500);
        }
    }

    public function getallbackup()
    {
        $publicPath = public_path();

    // Get the list of files in the public directory
    $files = scandir($publicPath);

    // Filter out '.' and '..' entries and files not starting with "psytal_backup_"
    $filteredFiles = preg_grep('/^psytal_backup_/', $files);

    // Initialize an empty array to store file contents
    $backupContents = [];

    // Loop through each filtered file
    foreach ($filteredFiles as $file) {
        // Read the content of each file
        $filePath = $publicPath . '/' . $file;
        $fileContent = file_get_contents($filePath);

        // Add file content to the array
        $backupContents[] = [
            'filename' => $file,
            'content' => $fileContent
        ];
    }

    // Return the array of file contents as JSON response
    return response()->json($backupContents);
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
