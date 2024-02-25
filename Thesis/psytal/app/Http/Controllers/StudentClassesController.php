<?php

namespace App\Http\Controllers;

use App\Models\student_classes;
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
                'message' => 'Student Not Found'
            ]);
        }

        return response()->json([
            'data' => $grades
        ]);
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
    public function show(student_classes $student_classes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(student_classes $student_classes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, student_classes $student_classes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(student_classes $student_classes)
    {
        //
    }
}
