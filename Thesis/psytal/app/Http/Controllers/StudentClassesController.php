<?php

namespace App\Http\Controllers;

use App\Models\classes;
use App\Models\student_classes;
use App\Models\student_profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentClassesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $grades = student_classes::where('student_profile_id', $user['id'])->first();

        if(!$grades){
            return response()->json([
                'message' => $user
            ]);
        }

        return response()->json([
            'data' => $grades
        ]);
    }

    public function studentGradesList(Request $request)
    {
        $studentProfileId = $request->query('student_profile_id'); // Fetching 'student_profile_id' from the request
        
        $studentSubjects = student_classes::where('student_profile_id', $studentProfileId)->get();
    
        $classDetails = [];
    
        foreach ($studentSubjects as $subject) {
            $class = classes::where('archived', 0)
                        ->where('class_id', $subject->class_id)
                        ->first();
    
            // Assuming 'grade' is a field in 'student_classes' table, you can add it to the class details
            $class->grade = $subject->grade;
            $class->student_class_id = $subject->id;
    
            // Append the class details along with grade to $classDetails array
            $classDetails[] = $class;
        }
    
        return response()->json($classDetails);
    }
    
}
