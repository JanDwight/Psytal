<?php

namespace App\Http\Controllers;

//use App\Http\Controllers\Controller;
use App\Models\links;
use Illuminate\Http\Request;
use App\Http\Requests\LinksRequest;
use App\Models\archive;


class LinksController extends Controller
{
     public function addLink(LinksRequest $request)
    {
        $data = $request->validated();

         /** @var \App\Models\links $links */

         $links = links::create([
            'class_code' => $data['class_code'],
            'class_description' => $data['class_description'],
            'instructor_name' => $data['instructor_name'],
            'url' => $data['url'],

        ]);
        return response([
            'links' => $links,
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
    $attributes = $request->all();
    
    $link->update($attributes); 
    return response()->json(['message' => 'Link updated successfully']);
    }
    
}
