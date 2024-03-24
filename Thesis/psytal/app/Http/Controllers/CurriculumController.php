<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddCurriculumRequest;
use App\Http\Requests\AddClassRequest;
use App\Models\curriculum;
use App\Models\classes;
use Illuminate\Http\Request;
use App\Models\archive;
use App\Models\logs;

class CurriculumController extends Controller
{
    public function addCurriculum(AddCurriculumRequest $request, AddClassRequest $classrequest)
    {
        $data = $request->validated();

        /** @var \App\Models\curriculum $curriculum */

        $curriculum = curriculum::create([
            'class_year' => $data['class_year'],
            'semester' => $data['semester'],
            'course_code' => $data['course_code'],
            'units' => $data['units'],
            'course_title' => $data['course_title'],
            'hoursperWeek' => $data['hoursperWeek'],
            'course_type' => $data['course_type'],
            'preReq' => $data['preReq']
        ]);

        //for classes
        //creates a new class every time a new course is created

        $classdata = $classrequest->validated();

        $placeholder = 'TBA';
        $classes = classes::create([
            'class_year' => $classdata['class_year'],
            'semester' => $classdata['semester'],
            'class_code' => $placeholder,
            'course_code' => $classdata['course_code'],
            'course_title' => $classdata['course_title'],
            'units' => $classdata['units'],
            'course_type' => $classdata['course_type'],
            'class_section' => $placeholder,
            'instructor_name' => $placeholder,
        ]);
        //placeholder value is replaced in update classes
        //add class might be removed

        //curriculum created
        $this->storeLog('Curriculum added', 'curriculum', $data['course_code'], 'curricula');

        //classes autocreated
        $this->storeLog('Class added', 'classes', $data['course_title'], 'classes');

        return response([
            'success' => true,
            'message' => 'Course created successfully'
        ]);
    }

    public function getCurriculum()
    {
        try {
            $curriculum = curriculum::where('archived', 0)->get(); // Retrieve unarchived curriculum from the database
            return response()->json(['curriculum' => $curriculum], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to retrieve course'], 500);
        }
    }
    
    public function archiveCurriculum(Request $request, $curriculumId)
    {
        try {

            $curriculum = curriculum::findOrFail($curriculumId);

            $curriculumTableName = (new curriculum)->getTable(); // Getting the table associated with the Link model

            // Get the name of the current model
            $itemType = class_basename($curriculum);

            $archive = new archive;
            $archive->item_id = $curriculum->id;
            $archive->item_name = $curriculum->course_code; // Use 'class_description' as the item name
            $archive->item_type = $itemType;
            $archive->origin_table = $curriculumTableName;
            $archive->archiver_id = auth()->user()->id; // Assuming you have user authentication
            $archive->archiver_name = auth()->user()->name; 
            $archive->archiver_role = auth()->user()->role;

            // Save to archives table
            $archive->save();
            //----
    
            $curriculum->archived = 1;
            $curriculum->save();

            $this->storeLog('Curriculum archived', 'curriculum', $curriculum->course_code, 'curricula');
            
            return response()->json(['message' => 'Archive course succesfully']);

        } catch (\Exception $e) {
            // Handle exceptions, e.g., log the error
            return response()->json(['message' => 'Error archiving course'], 500);
        }
    }

    public function updateCurriculum(Request $request, $curriculumId)
    {
        //also update corresponding classes in classess table

            $curriculumData = curriculum::find($curriculumId);
            
        if (!$curriculumData) {
            // Handle the case where the preregID with the provided ID is not found
            return response()->json(['message' => 'Form not found'], 404);
        }

        // Extract the attributes from the request
        $attributes = $request->all();
        
        try{
            $curriculumData->update($attributes);

            $this->storeLog('Curriculum updated', 'curriculum', $curriculumData->course_code, 'curricula');
            
                return response()->json([
                    'success' => true,
                    'message' => 'Course updated successfully'
                ]);
        }
        catch (\Exception $e) 
        {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ]);
        }
    }

    //show for add classes dropdown
    public function show_curriculum()
    {
        $subjects = curriculum::select('id', 'course_title', 'course_code', 'units', 'semester', 'course_type', 'class_year')
        ->get();

        return response()->json($subjects);
    }
    //show for add classes autofill
    public function get_selected($id)
    {
        $curriculum = curriculum::find($id, ['course_title', 'course_code', 'units', 'semester', 'course_type', 'class_year']);

        if (!$curriculum) {
            return response()->json(['message' => 'Curriculum not found'], 404);
        }

        return response()->json($curriculum);
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