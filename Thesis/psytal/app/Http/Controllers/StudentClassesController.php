<?php

namespace App\Http\Controllers;

use App\Models\classes;
use App\Models\student_classes;
use App\Models\student_profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
                'message' => 'Student Not Found'
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
        // Extract unique terms from the student subjects and convert to array
        $uniqueTerms = $studentSubjects->pluck('term')->unique()->toArray();

        // Re-index the array to ensure consecutive numeric indices
        $uniqueTerms = array_values($uniqueTerms);

        $classDetails = [];
    
        foreach ($studentSubjects as $subject) {
            $class = classes::where('archived', 0)
                        ->where('class_id', $subject->class_id)
                        ->first();
    
            // Assuming 'grade' is a field in 'student_classes' table, you can add it to the class details
            $class->grade = $subject->grade;
            $class->student_class_id = $subject->id;
            $class->term = $subject->term;
    
            // Append the class details along with grade to $classDetails array
            $classDetails[] = $class;
        }
    
        return response()->json([
            'classdetails' => $classDetails,
            'terms' => $uniqueTerms
        ]);
    }

    public function studentGradesListAdmin(Request $request)
    {
        $studentProfile = student_profile::where('last_name', $request["last_name"])
        ->where('first_name',$request["first_name"])
        ->where('middle_name',$request["middle_name"])
        ->first();
        $studentSubjects = DB::table('student_classes')->where('student_profile_id', $studentProfile["student_profile_id"])->get();
    
        $classDetails = [];
    
        foreach ($studentSubjects as $subject) {
            $class = classes::where('archived', 0)
                        ->where('class_id', $subject->class_id)
                        ->first();
    
            // Assuming 'grade' is a field in 'student_classes' table, you can add it to the class details
            $class->grade = $subject->grade;
            $class->term = $subject->term;
            $class->yrlevel = $subject->yrlevel;
            $class->student_class_id = $subject->id;
    
            // Append the class details along with grade to $classDetails array
            $classDetails[] = $class;
        }
    
        return response($classDetails);
    }
    
}
