<?php

namespace App\Http\Controllers;

use App\Http\Requests\SemesterInformationRequest;
use App\Models\semester_information;
use App\Models\logs;
use App\Models\posts; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\DB;


class SemesterInformationController extends Controller
{
    public function index()
    {
        // Retrieve all logs starting from the most recent
        $semesterInformation = semester_information::get();
        
        // Retrieve the current date from the system
        $currentDate = date("Y-m-d H:i:s");
    
        // Check if there are any records
        if ($semesterInformation->isNotEmpty()) {
            // Access the first item in the collection
            $firstSemester = $semesterInformation->first();

            $startYear = $firstSemester['start_of_school_year'];
            $endYear = ($firstSemester['end_of_school_year']);
        
            // Combine semester and extract the year from start_of_school_year and end_of_school_year
            $ongoingSemester = $firstSemester['semester'] . ' ' . $startYear . ' - ' . $endYear;

            //-----
                //if semester is ended delete all pre-reg?
            if($currentDate > $firstSemester['end_of_semester']){
                DB::table('preregistration_incoming_tmps')->delete();
            } else {}
            //-----
           
            // Check if the current date is equal to or greater than end_of_school_year
            if ($currentDate > $firstSemester['end_of_prereg']) {
                //end of pre-reg
                //end of semester another if for deleting pre-registration
                //update open_pre_reg value to 0
                semester_information::query()->update(['open_pre_reg' => 0]);
                //run the closeprereg function at the bottom $this->, send id=1
                $this->setPreregPost('closed');

                return response([
                    "semester" => $ongoingSemester,
                    "startPR" => $firstSemester['start_of_prereg'],
                    "endPR" => $firstSemester['end_of_prereg'],
                    "openPR" => $firstSemester['open_pre_reg'],
                ]);
            } else {
                // Return the ongoing semester without updating open_pre_reg
                return response([
                    "semester" => $ongoingSemester,
                    "startPR" => $firstSemester['start_of_prereg'],
                    "endPR" => $firstSemester['end_of_prereg'],
                    "openPR" => $firstSemester['open_pre_reg'],
                ]);
            }
        } else {
            // Handle the case when no records are found
            return response(['No semester information found.']);
        }
    }

    public function getschoolyear()
    {
        // Retrieve all logs starting from the most recent
        $semesterInformation = semester_information::get();

        // Check if there are any records
        if ($semesterInformation->isNotEmpty()) {
            // Access the first item in the collection
            $firstSemester = $semesterInformation->first();

            //return response([$startYear, $endYear, $semester, $prStatus]);
            return response($firstSemester);
        } else {
            // Handle the case when no records are found
            return response(['No semester information found.']);
        }
    }

    public function getopenprereg()
    {
        // Retrieve all logs starting from the most recent
        $semesterInformation = semester_information::get();

        // Check if there are any records
        if ($semesterInformation->isNotEmpty()) {
            // Access the first item in the collection
            $prereg = $semesterInformation->first();

            //get the value of open_pre_reg
            $openprereg = ($prereg['open_pre_reg']);

            return response([$openprereg]);
        } else {
            // Handle the case when no records are found
            return response(['No semester information found.']);
        }
    }

    public function addsemesterinformation(SemesterInformationRequest $request)
    {
        $data = $request->validated();

        // Check if a record with the specified semester already exists
        //$existingSemesterInfo = semester_information::where('semester', $data['semester'])->first();
        $existingSemesterInfo = semester_information::where('id', 1)
                                                //->where('semester', $data['semester'])
                                                ->first();
        //should only create if there is no item with id=1, then set the id to 1 (if possible)
        //the rest is update

        if ($existingSemesterInfo) {
            // Update the existing record
            $existingSemesterInfo->update([
                'start_of_prereg' => $data['start_of_prereg'],
                'end_of_prereg' => $data['end_of_prereg'],
                'start_of_semester' => $data['start_of_semester'],
                'end_of_semester' => $data['end_of_semester'],
                'start_of_school_year' => $data['start_of_school_year'],
                'end_of_school_year' => $data['end_of_school_year'],
                'open_pre_reg' => $data['open_pre_reg'],
                'semester' => $data['semester']
            ]);

            $this->storeLog('Semester information updated', 'semester information', 'Pre-registration updated', 'semester_information');

            $this->setPreregPost('open');

            return response([
                'message' => 'Semester information updated successfully',
                'success' => true
            ]);
        } else {
            // Create a new record
            $semesterinformation = semester_information::create([
                'start_of_prereg' => $data['start_of_prereg'],
                'end_of_prereg' => $data['end_of_prereg'],
                'start_of_semester' => $data['start_of_semester'],
                'end_of_semester' => $data['end_of_semester'],
                'start_of_school_year' => $data['start_of_school_year'],
                'end_of_school_year' => $data['end_of_school_year'],
                'semester' => $data['semester'],
                'open_pre_reg' => $data['open_pre_reg']
            ]);

            $this->storeLog('Semester information created', 'semester information', 'Pre-registration opened', 'semester_information');

            $this->setPreregPost('open');

            return response([
                'message' => 'Semester information created successfully',
                'success' => true]);
        }
    }

    public function closeprereg(Request $request, $id)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'fullName' => 'required',
            'password' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid credentials. Please provide valid full name and password.',
                'success' => false,
                'errors' => $validator->errors()
            ], 422); // Unprocessable Entity status code
        }
    
        // Find the user by fullName
        $user = User::where('name', $request->fullName)->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            // Invalid credentials
            return response()->json([
                'message' => 'Invalid full name or password.',
                'success' => false
            ]);
        }
    
        // If authentication successful, proceed to update pre-registration information
    
        // Clean the preregistration_incoming_tmps table
        //DB::table('preregistration_incoming_tmps')->delete(); //remove for prereg, add to semester auto delete
    
        $semesterinfo = semester_information::find($id);
    
        if (!$semesterinfo) {
            // Handle the case where the preregID with the provided ID is not found
            return response()->json([
                'message' => 'Pre-registration information is not found. Please set the information first',
                'success' => false
            ]);
        }
    
        // Extract the attributes from the request
        $data = $request->except(['fullName', 'password']); // Exclude fullName and password from the update data
    
        $semesterinfo->update($data);
    
        $this->storeLog('Pre-registration status updated', 'pre-reg status', 'Pre-registration closed', 'semester_information');
    
        $this->setPreregPost('closed');

        return response()->json([
            'message' => 'Pre-Registration is Now Closed',
            'success' => true
        ]);
    }
    
    //----------
    public function updatesemesterinformation(SemesterInformationRequest $request)
    {
        $data = $request->validated();
        $existingSemesterInfo = semester_information::where('id', 1)
                                                ->first();

        if ($existingSemesterInfo) {
            // Update the existing record
            $existingSemesterInfo->update([
                'start_of_prereg' => $data['start_of_prereg'],
                'end_of_prereg' => $data['end_of_prereg'],
                'start_of_semester' => $data['start_of_semester'],
                'end_of_semester' => $data['end_of_semester'],
                'start_of_school_year' => $data['start_of_school_year'],
                'end_of_school_year' => $data['end_of_school_year'],
                'open_pre_reg' => $data['open_pre_reg'],
                'semester' => $data['semester']
            ]);

            $this->storeLog('Semester information updated', 'semester information', 'Pre-registration information updated', 'semester_information');

            if ($existingSemesterInfo['open_pre_reg']){
                $this->setPreregPost('open');
            } else {
                $this->setPreregPost('closed');

            }
 

            return response([
                'message' => 'Semester information updated successfully',
                'success' => true
            ]);
        } else {
            return response([
                'message' => 'Semester information update failed',
                'success' => false
            ]);
        }
    }
    //----------

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
       //pending tests

    public function setPreregPost($change)
       {
        $semInfoId = 1;
        $semInfo = semester_information::where('id', $semInfoId)->first();
        $startofPR = $semInfo['start_of_prereg'];
        $endofPR = $semInfo['end_of_prereg'];

        $startofPRFormatted = date('F j, Y', strtotime($startofPR));
        $endofPRFormatted = date('F j, Y', strtotime($endofPR));

        if ($semInfo) {
            //ask for input for the messages
            $messagetitle = "Pre-registration period for " . $semInfo['semester'] . " SY: " . $semInfo['start_of_school_year'] ."-" . $semInfo['end_of_school_year'] . " is now " . $change . ".";
            $messagebody = "Pre-registration will be open starting from " . $startofPRFormatted ." to " . $endofPRFormatted . ".";

            $messageOpen = " All students please be guided to complete the online pre-registration forms in your respective accounts before the end of the pre-registration period.";
            $messageClosed = " All students please be guided that the college is no longer accepting pre-registration forms.";

            if($change === 'open') {

                $existingPost = posts::where('title', $messagetitle)->first()->delete();

                $preRegPost = posts::create([
                    'user_id' =>  auth()->user()->id,
                    'title' => $messagetitle,
                    'description' => $messagebody . $messageOpen,
                ]);
               
                $this->storeLog('Pre-reg open post created', 'posts', $messagetitle, 'posts');

            } else if ($change === 'closed') {

                $existingPost = posts::where('title', $messagetitle)->first()->delete();
               
                $preRegPost = posts::create([
                    'user_id' =>  auth()->user()->id,
                    'title' => $messagetitle,
                    'description' => $messageClosed,
                ]);

                $this->storeLog('Pre-reg closed post created', 'posts', $messagetitle, 'posts');
            }

        } else {
            return response()->json(['No Semester Information found.']);
        }

       }
}
