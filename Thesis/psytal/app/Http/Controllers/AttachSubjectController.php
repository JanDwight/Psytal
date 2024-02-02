<?php

namespace App\Http\Controllers;

use App\Models\student_classes;
use Illuminate\Http\Request;
use App\Http\Requests\attachRequest;
use App\Models\student_profile;
use App\Models\classes;
use App\Models\Attachment;
use Illuminate\Support\Facades\Auth;

class AttachSubjectController extends Controller
{
    public function createStudentClasses(Request $request)
    {
        $request->validate([
            'studentData' => 'required|array',
            'studentData.first_name' => 'required',
            'studentData.middle_name' => 'required',
            'studentData.last_name' => 'required',
            'subjectData' => 'required'
        ]);

        $student = student_profile::where('first_name', $request->input('studentData.first_name'))
            ->where('middle_name', $request->input('studentData.middle_name'))
            ->where('last_name', $request->input('studentData.last_name'))
            ->first();

        if (!$student) {
            return response()->json(['error' => 'Student not found.'], 404);
        }

        
        // Retrieve the student_profile_id
        $studentProfileID = $student->student_profile_id;

        $subjects = $request->input('subjectData');

        // Create an instance of the student_classes model for each class
        foreach ($request->input('subjectData') as $subject) {
            $studentClasses = new student_classes();
        
            // Set the attributes
            $studentClasses->student_profile_id = $studentProfileID;
            $studentClasses->class_id = $subject['class_id']; 
            $studentClasses->grade = '0';
            
            $instructor = classes::findOrFail($subject['class_id']);
            
            $instructorName = $instructor->instructor_name;

            $studentClasses->instructor_profile = $instructorName;
            // Save the record to the student_classes table
            $studentClasses->save();
        }

        return response()->json(['message' => $instructor]);
    }

    public function editGrade(Request $request, $studentName)
    {
        // Split the full name into an array
        $nameParts = explode(' ', $studentName);

        // Initialize variables for lastName, firstName, and middleInitial
        $lastName = '';
        $firstName = '';
        $middleInitial = '';

        // Extract the values based on the array length
        $namePartsCount = count($nameParts);

        // If there are at least 2 elements, consider the first as the last name and the rest as the first name
        if ($namePartsCount >= 2) {
            $lastName = rtrim($nameParts[0], ',');
            $firstNameArray = array_slice($nameParts, 1, -1); // Exclude the last element
            $firstName = implode(' ', $firstNameArray);

            // If there are more than 2 elements, consider the last element as the middle initial
            if ($namePartsCount > 2) {
                $middleInitial = end($nameParts); // Get the last element as the middle initial
            }
        }

        // Create an array with the separated values
        $separatedNames = [
            'lastName' => $lastName,
            'firstName' => $firstName,
            'middleInitial' => $middleInitial,
        ];

        // Modify the query to include the last name and first name conditions
        $selectedStudent = student_profile::where('last_name', $separatedNames['lastName'])
            ->where('first_name', $separatedNames['firstName'])
            ->first();

        // Check if the selected student exists
        if (!$selectedStudent) {
            return response()->json(['error' => 'Student not found'], 404);
        }

        // Modify the query to include the class ID condition
        $selectedClass = student_classes::where('class_id', $request['class_id'])
            ->where('student_profile_id', $selectedStudent->student_profile_id)
            ->get()
            ->first();

        // Check if the selected class exists for the student
        if (!$selectedClass) {
            return response()->json(['error' => 'Student not found in the selected class'], 404);
        }

        // Create a collection to store the updated records
$updatedRecords = collect();

// Check if $selectedClass is a single record or a collection of records
if ($selectedClass instanceof \Illuminate\Database\Eloquent\Collection) {
    // Loop through each class record and update the grade for the selected student
    foreach ($selectedClass as $class) {
        if ($class) {
            $class->grade = $request['grade'];
            $class->save();
            $updatedRecords->push($class);
        }
    }
} elseif ($selectedClass instanceof \Illuminate\Database\Eloquent\Model) {
    // If it's a single record, update the grade directly
    $selectedClass->grade = $request['grade'];
    $selectedClass->save();
    $updatedRecords->push($selectedClass);
}

// You may want to return a success message or the updated data here
return response()->json(['message' => 'Grade updated successfully', 'updatedRecords' => $updatedRecords]);
    }

    
    //
    public function attachSubjectToStudent(Request $request)
    {
        //note: classCode is actually the class_id
        $request->validate([
            'studentData' => 'required|array',
            'studentData.first_name' => 'required', // Replace 'first_name' with the actual key in your nested array
            'studentData.last_name' => 'required', // Replace 'last_name' with the actual key in your nested array
            'subjectData' => 'required|array',
            'subjectData.*.classCode' => 'required', // Replace 'class_code' with the actual key in your nested array
            'subjectData.*.courseCode' => 'required', // Replace 'course_code' with the actual key in your nested array
            'subjectData.*.units' => 'required',
            //'subjectData.*.bcac' => 'required',
        ]);

        $studentProfile = student_profile::where('first_name', $request->input('studentData.first_name'))
                    ->where('last_name', $request->input('studentData.last_name'))
                    ->first();

    // Arrays to store values
    $courseCodes = [];
    $classCodes = [];
    $units = [];
    $bcacs = [];

    foreach ($request->input('subjectData') as $subject) {
        $classCode = $subject['classCode'];

        // Split classCode into ID and ClassCode
        list($firstNumber, $secondNumber) = explode('-', $classCode);
        $classCode2 = $secondNumber;

        $courseCode = $subject['courseCode'];
        $unit = $subject['units'];
        $bcac = $subject['bcac']; // Uncomment if bcac is present in the request

        $courseCodes[] = $courseCode;
        $classCodes[] = $classCode2;
        $units[] = $unit;
        $bcacs[] = $bcac; // Uncomment if bcac is present in the request

        // Find the class by classCode and attach it
        $class = classes::where('class_id', $classCode)->first();
        if ($class) {
            $studentProfile->classes()->attach($class->class_id, [
                'student_profile_id' => $studentProfile->student_profile_id,
                'instructor_profile' => $class->instructor_name,
                'class_code' => $classCode2,
                'course_code' => $courseCode,
                'units' => $unit,
                'course_type' => $bcac, // Uncomment if bcac is present in the request
            ]);
        }
    }

    // Attach course/class details
    // Option: Create Different DB

        return response([
            'message' => 'Class attached to student successfully',
            'studentProfile' => $studentProfile,
            'studentProfileID' => $studentProfile->student_profile_id,
            'courseCodes' => $courseCodes,
            'classCodes' => $classCodes,
            'units' => $units,
            'bcacs' => $bcacs,
        ], 200);
    }
}
