<?php

namespace App\Http\Controllers;

use App\Models\employee_profile;
use App\Models\User;
use App\Models\logs;
use Illuminate\Http\Request;

class EmployeeProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Excludes showing archived users
        $users = employee_profile::where('archived', 0)
            ->orderBy('id', 'asc')
            ->get(); // Change '0' to '1' to get archived users
    
        // Look for the user
        $userRoles = User::where('archived', 0)
            ->where('role', '!=', 4)
            ->orderBy('id', 'asc')
            ->get();
    
        $userList = [];
    
        foreach ($users as $user) {
            $fullName = $user['last_name'] . ', ' . $user['first_name'];
        
            if (!empty($user['middle_name'])) {
                $middleInitial = substr($user['middle_name'], 0, 1);
                $fullName .= ' ' . $middleInitial . '.';
            }
        
            // Find the corresponding role in $userRoles
            $userRole = User::where('id', $user['user_id'])->first();
        
            $userList[] = [
                'user_id' => $user['user_id'],
                'employee_id' => $user['employee_id'],
                'username' => $user['username'],
                'full_name' => $fullName,
                'email_address' => $user['email_address'],
                'role' => $user['role'],
            ];
        }
    
        return response()->json($userList);
    }

    public function edit_employee_profile(Request $request, $id)
    {
        
        $validatedData = $request->validate([
            'id' => 'required',
            'name' => 'required|string|max:255',
            'role' => 'required|integer',
            'email' => 'required|email|max:255',
        ]);
        //explode name and year

        $fullName = $validatedData['name'];

        // Extracting last name from $fullName
        $lastName = explode(', ', $fullName)[0]; // Extracts last name

        // Extracting first name from $fullName
        $firstNameWithInitial = explode(', ', $fullName)[1]; // Extracts first name + middle initial
        $firstName = explode(' ', $firstNameWithInitial)[0]; // Extracts first name only

        // Extracting middle initial from $fullName
        $middleInitial = explode(' ', $firstNameWithInitial)[1][0]; // Extracts MI

        //explode the name

        $employee_profile = employee_profile::where('user_id', $id)->first();

        if ($employee_profile) {
            // Handle the case where the user with the provided ID is not found
            $employee_profile->update([
                'employee_id' => $validatedData['id'],
                'last_name' => $lastName,
                'first_name' => $firstName,
                'middle_name' => $middleInitial,
                'email_address' => $validatedData['email'],
                'role' => $validatedData['role'],
            ]);

            $this->storeLog('Employee profile updated', 'employee profile', $fullName, 'employee_profiles');

            return response()->json(['message' => 'Profile Updated']);
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

    //add archive function

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
