<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentProfileRequest;
use App\Models\student_profile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\logs;
use Illuminate\Support\Facades\Auth;

class StudentProfileController extends Controller
{
    public function showcurrentuser (Request $request)
    {
        // Retrieve the authenticated user
        $user = DB::table('preregistration_incoming_tmps')
        ->get();

        // Check if a user is authenticated
        if ($user) {
            $user = $user->map(function ($item) {
                // Extract the first character of the middle_name
                $middleInitial = strtoupper(substr($item->middle_name, 0, 1));
                // Convert created_at to a Carbon instance and format it to display only the date
                $item->created_at = Carbon::parse($item->created_at)->toDateString();
                //Combine the last, first and middle name into a fullname
                $item->full_name = $item->last_name . ', ' . $item->first_name . ' ' . $middleInitial .'.';
                return $item;
            });
        } 

        return $user->toArray();
    }

    public function updatestudentprofile(StudentProfileRequest $request)
    {
        $data = $request->validated();
    
        // Retrieve the user by full name
        $fullName = $data['last_name'] . ', ' . $data['first_name'];
        if (!empty($data['middle_name'])) {
            $middleInitial = substr($data['middle_name'], 0, 1);
            $fullName .= ' ' . $middleInitial . '.';
        }
        $user = User::where('name', $fullName)->firstOrFail();
        $userId = $user->id;
    
        // Find the existing student profile by user ID
        $studentprofile = student_profile::where('user_id', $userId)->firstOrFail();
    
        // Update student profile attributes
        $studentprofile->update([
            'start_of_school_year' => $data['start_of_school_year'],
            'end_of_school_year' => $data['end_of_school_year'],
            'student_school_id' => $data['student_school_id'],
            'learners_reference_number' => $data['learners_reference_number'],
            'last_name' => $data['last_name'],
            'first_name' => $data['first_name'],
            'middle_name' => $data['middle_name'],
            'maiden_name' => $data['maiden_name'],
            'academic_classification' => $data['academic_classification'],
            'last_school_attended' => $data['last_school_attended'],
            'address_of_school_attended' => $data['address_of_school_attended'],
            'degree' => $data['degree'],
            'date_of_birth' => $data['date_of_birth'],
            'place_of_birth' => $data['place_of_birth'],
            'citizenship' => $data['citizenship'],
            'sex_at_birth' => $data['sex_at_birth'],
            'ethnicity' => $data['ethnicity'],
            'special_needs' => $data['special_needs'],
            'contact_number' => $data['contact_number'],
            'email_address' => $data['email_address'],
            'home_address' => $data['home_address'],
            'address_while_studying' => $data['address_while_studying'],
            'contact_person_name' => $data['contact_person_name'],
            'contact_person_number' => $data['contact_person_number'],
            'contact_person_address' => $data['contact_person_address'],
            'contact_person_relationship' => $data['contact_person_relationship'],
            'pre_reg_status' => $data['pre_reg_status'],
            'type_of_student' => $data['type_of_student'],
        ]);

        $fullName = $data['last_name'] . ', ' . $data['first_name'] . ' ' . $data['middle_name'];
    
        $this->storeLog('Student profile updated', 'student profile', $fullName, 'student_profiles');
    
        return response([
            'prereg' => $studentprofile,
            'user' => $userId,
        ]);
    }
    

    /**
     * Display a listing of the resource.
     */
    //????????
    public function index()
    {
        // Excludes showing archived users and where learners_reference_Number is not null
        $users = student_profile::where('archived', 0)
                                ->whereNotNull('learners_reference_Number')
                                ->get();
    
        $userList = [];
    
        foreach ($users as $user) {
            $fullName = $user['last_name'] . ', ' . $user['first_name'];
        
            if (!empty($user['middle_name'])) {
                $middleInitial = substr($user['middle_name'], 0, 1);
                $fullName .= ' ' . $middleInitial . '.';
            }
        
            $yearLevel = $user['year_level'] . $user['section'];
        
            if (empty($yearLevel)) {
                $yearLevel = 'n/a';
            }
        
            $userList[] = [
                'student_profile_id' => $user['student_profile_id'],
                'user_id' => $user['user_id'],
                'student_school_id' => $user['student_school_id'],
                'full_name' => $fullName,
                'email' => $user['email_address'],
                'user_id' => $user['user_id'],
                'yrsection' => $yearLevel,
            ];
        }
    
        return response()->json($userList);
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
    public function show(student_profile $student_profile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit_student_profile(Request $request, $id)
    {
        
        $validatedData = $request->validate([
            'id' => 'required|integer',
            'name' => 'required|string|max:255',
            'yr' => 'required|string',
            'email' => 'required|email|max:255',
        ]);
        //explode name and year

        $year_section = $validatedData['yr'];
        $fullName = $validatedData['name'];

        // Extracting last name from $fullName
        $lastName = explode(', ', $fullName)[0]; // Extracts last name

        // Extracting first name from $fullName
        $firstNameWithInitial = explode(', ', $fullName)[1]; // Extracts first name + middle initial
        $firstName = explode(' ', $firstNameWithInitial)[0]; // Extracts first name only

        // Extracting middle initial from $fullName
        $middleInitial = explode(' ', $firstNameWithInitial)[1][0]; // Extracts MI

        if (!empty($year_section)) {
            $year_level = substr($year_section, 0, -1); // Extract year_level (remove last character)
            $section = substr($year_section, -1); // Extract section (last character)
        } else {
            // Handle case when $yearLevel is empty
        }

        //explode the name

        $student_profile = student_profile::where('user_id', $id)->first();

        if ($student_profile) {
            // Handle the case where the user with the provided ID is not found
            $student_profile->update([
                'student_school_id' => $validatedData['id'],
                'last_name' => $lastName,
                'first_name' => $firstName,
                'middle_name' => $middleInitial,
                'email_address' => $validatedData['email'],
                'year_level' => $year_level,
                'section' => $section,
            ]);

            $this->storeLog('Student profile updated', 'student profile', $fullName, 'student_profiles');

            //return response()->json(['message' => 'Class not found'], 404);
        } else {
            return response()->json(['message' => 'Class not found'], 404);
        }

        /*$user = User::create([
            'name' => $data['name'],
            'password' => bcrypt($data['password']),
            'role' => $data['role'],
            'email' => $data['email'],
        ]);*/ 
        //ADD UPDATE FOR USERS TABLE ALSO

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, student_profile $student_profile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(student_profile $student_profile)
    {
        //
    }

    //add archive

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
