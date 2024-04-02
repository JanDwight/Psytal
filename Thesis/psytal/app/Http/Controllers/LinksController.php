<?php

namespace App\Http\Controllers;

//use App\Http\Controllers\Controller;
use App\Models\links;
use Illuminate\Http\Request;
use App\Http\Requests\LinksRequest;
use App\Models\archive;
use App\Models\logs;


class LinksController extends Controller
{
     public function addLink(LinksRequest $request)
    {
        $data = $request->validated();

         /** @var \App\Models\links $links */

          // Check if there's already a link with the same attributes
        $existingLink = Links::where('class_code', $data['class_code'])
        ->where('class_description', $data['class_description'])
        ->where('instructor_name', $data['instructor_name'])
        ->where('url', $data['url'])
        ->first();

        if ($existingLink) {
            return response([
                'message' => 'A link with the same attributes already exists',
                'success' => false
            ]);
        }

         $links = links::create([
            'class_code' => $data['class_code'],
            'class_description' => $data['class_description'],
            'instructor_name' => $data['instructor_name'],
            'url' => $data['url'],

        ]);

        //logs call
        $this->storeLog( 'Link created', 'link', $data['class_code'], 'links');

        return response([
            'message' => 'Link created successfully',
            'success' => true
        ]);
    }

    public function getLinks()
    {
        try {
            $links = Links::where('archived', 0)->get(); // Retrieve all links from the database
            return response()->json(['links' => $links], 200);
            $link -> update(['archive'=>1]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to retrieve links'], 500);
        }
    }

    public function archiveLink(Request $request,$linkId)
    {
        try {
            // Find the link by ID or fail with a 404 response if not found
            $link = links::findOrFail($linkId);

            $linkTableName = (new links)->getTable(); // Getting the table associated with the Link model
    
            // Get the name of the current model
            $itemType = class_basename($link);
    
            //----
            // Create an Archive instance
            $archive = new archive;
            $archive->item_id = $link->id;
            $archive->item_name = $link->class_code; // Use 'class_description' as the item name
            $archive->item_type = $itemType;
            $archive->origin_table = $linkTableName;
            $archive->archiver_id = auth()->user()->id; // Assuming you have user authentication
            $archive->archiver_name = auth()->user()->name; 
            $archive->archiver_role = auth()->user()->role;

            // Save to archives table
            $archive->save();
            //----
    
            $link->archived = 1;
            $link->save();

            $this->storeLog( 'Link archived', 'link', $link->class_code, 'links');
    
            return response()->json(['message' => 'Link archived successfully']);
        } catch (\Exception $e) {
            // Handle exceptions, e.g., log the error
            return response()->json(['message' => 'Error archiving link: ' . $e->getMessage()], 500);
        }
    }

    public function updateLink(Request $request, $linkId)
    {
        $link = Links::find($linkId);
    
    if (!$link) {
        // Handle the case where the preregID with the provided ID is not found
        return response()->json(['message' => 'Form not found'], 404);
    }

    // Extract the attributes from the request
    $newAttributes = $request->all();
    
    // Check if any changes have been made to the link attributes
    try {
        $link->update($newAttributes);

        // Check if any changes were made
        if ($link->wasChanged()) {
            // Log the link update
            $this->storeLog('Link updated', 'link', $link->class_code, 'links');
            
            return response()->json([
                'success' => true,
                'message' => 'Link updated successfully'
            ]);
        } else {
            // No changes made
            return response()->json([
                'success' => false,
                'message' => 'No changes were made'
            ]);
        }
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error: ' . $e->getMessage()
        ]);
      }   
    }
    
    public function storeLog($actionTaken, $itemType, $itemName, $itemOrigin)
    {
        
        $id_test = 90;
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
