<?php

namespace App\Http\Controllers;

use App\Models\classes;
use App\Models\student_classes;
use App\Models\student_profile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class InstructorClassesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
    
        $studentClasses = student_classes::where('archived', 0)
            ->where('instructor_profile', $user->name)
            ->get();
    
        if ($studentClasses->isEmpty()) {
            return response()->json(['message' => 'No classes found for the instructor.'], 404);
        }
    
        $classDetails = [];
    
        foreach ($studentClasses as $subject) {
            $classDetail = classes::where('archived', 0)
                ->where('class_id', $subject->class_id)
                ->first();
    
            // Check if the classDetail is not null before adding it to the array
            if ($classDetail && !in_array($classDetail, $classDetails)) {
                $classDetails[] = $classDetail;
            }
        }
    
        return response()->json($classDetails);
    }

    public function showStudentClasses()
    {
        $user = Auth::user();
    
        $studentClasses = student_classes::where('archived', 0)
            ->where('instructor_profile', $user->name)
            ->get();
    
        if ($studentClasses->isEmpty()) {
            return response()->json(['message' => 'No classes found for the instructor.'], 404);
        }
    
        $classDetails = [];
    
        foreach ($studentClasses as $subject) {
            $student = student_profile::where('archived', 0)
                ->where('student_profile_id', $subject->student_profile_id)
                ->first();
    
            if ($student) {
                $middleInitial = strtoupper(substr($student->middle_name, 0, 1));
                $studentFullName = $student->last_name . ', ' . $student->first_name . ' ' . $middleInitial . '.';
                
                // Check if the studentFullName is not already in the array before adding it
                if (!in_array(['name' => $studentFullName], $classDetails)) {
                    $classDetails[] = ['name' => $studentFullName];
                }
            }
        }
    
        return response()->json($classDetails);
    }
}
