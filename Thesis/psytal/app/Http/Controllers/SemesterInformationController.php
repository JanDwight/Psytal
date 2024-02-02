<?php

namespace App\Http\Controllers;

use App\Http\Requests\SemesterInformationRequest;
use App\Models\semester_information;
use Illuminate\Http\Request;
use Carbon\Carbon;

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
        
            // Convert start_of_school_year and end_of_school_year to Carbon objects
            $startYear = Carbon::parse($firstSemester['start_of_school_year'])->year;
            $endYear = Carbon::parse($firstSemester['end_of_school_year'])->year;
        
            // Combine semester and extract the year from start_of_school_year and end_of_school_year
            $ongoingSemester = $firstSemester['semester'] . ' ' . $startYear . ' - ' . $endYear;
        
            // Check if the current date is equal to or greater than end_of_school_year
            if ($currentDate >= $firstSemester['end_of_school_year']) {
                // Update open_pre_reg value to 0
                semester_information::update(['open_pre_reg' => 0]);
            } else {
                // Return the ongoing semester without updating open_pre_reg
                return response([$ongoingSemester]);
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

            // Convert start_of_school_year and end_of_school_year to Carbon objects
            $startYear = ($firstSemester['start_of_school_year']);
            $endYear = ($firstSemester['end_of_school_year']);

            return response([$startYear, $endYear]);
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
        $existingSemesterInfo = semester_information::where('semester', $data['semester'])->first();

        if ($existingSemesterInfo) {
            // Update the existing record
            $existingSemesterInfo->update([
                'start_of_prereg' => $data['start_of_prereg'],
                'end_of_prereg' => $data['end_of_prereg'],
                'start_of_semester' => $data['start_of_semester'],
                'end_of_semester' => $data['end_of_semester'],
                'start_of_school_year' => $data['start_of_school_year'],
                'end_of_school_year' => $data['end_of_school_year'],
                'open_pre_reg' => $data['open_pre_reg']
            ]);

            return response(['success' => 'Semester information updated successfully']);
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

            return response(['success' => 'Semester information created successfully']);
        }
    }

    public function closeprereg(Request $request, $id)
    {
        
        $semesterinfo = semester_information::find($id);
        
    if (!$semesterinfo) {
        // Handle the case where the preregID with the provided ID is not found
        return response()->json(['message' => 'Something Went Wrong'], 404);
    }

    // Extract the attributes from the request
    $data = $request->all();
    
    $semesterinfo->update($data);  
    return response()->json(['message' => 'Pre-Registration is Now Closed']);
    }

}
