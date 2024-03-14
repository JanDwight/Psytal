<?php

namespace App\Http\Controllers;

use App\Models\employee_profile;
use App\Models\student_profile;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\logs;
use App\Models\archive;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    //for show all users
    public function index()
    {
        /*$users = User::all();
        return response()->json($users); sends ALL data from users table*/

        //excludes showing archived users
        $users = User::where('archived', 0)->get(); // Change '0' to '1' to get archived users

        return response()->json($users);

    }
    //for dashboard count
    public function count_students()
    {
        $studentCount = (int)User::where('role', 4)->count();
        return response()->json($studentCount);

    }
    //for dashboard count
    public function count_employee()
    {
        $employeeCount = (int)User::whereIn('role', [1, 2, 3])->count();
        return response()->json($employeeCount);
    }
    //for add class instructors
    //only send id and name pending delete
    public function show_instructors()
    {
        $instructors = User::where('role', 3)
        ->where('archived', 0)
        ->select('id', 'name')
        ->get();

        return response()->json($instructors);
    }
    //for update user
    public function updateUser(Request $request, $id)
    {
        // Validate the incoming data (e.g., name, role, email, lastedit)
        $validatedData = $request->validate([
            'id' => 'required|integer',
            'name' => 'required|string|max:255',
            'role' => 'required|integer|min:1|max:4',
            'email' => 'required|email|max:255',
            //'lastedit' => 'required|date', // Modify this validation rule as needed
        ]);

        // Retrieve the user based on the provided ID
        $user = User::find($id);

        if (!$user) {
            // Handle the case where the user with the provided ID is not found
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update the user's information with the validated data
        $user->update($validatedData);

        $this->storeLog('User information updated', 'user', "User ID: {$id}", 'users');

        // Return a success response
        return response()->json(['message' => 'User updated successfully']);
    }

    //User profile Update========================================================================
    public function userprofileemailupdate(Request $request){
        // Retrieve the authenticated user
        $user = Auth::user();
    
        // Validate the request data, assuming you have a form field named 'email'
        $request->validate([
            'email' => 'required|email|unique:users,email,'.$user->id,
        ]);
    
        // Update the user's email
        $user->email = $request->input('email');
        $user->save();

        $this->storeLog('User email updated', 'user', "User ID: {$user->id}", 'users');
    
        return response(['success' => 'Email updated successfully']);
    }
    
    //User profile Update========================================================================
    public function userprofilepasswordupdate(Request $request){
        // Retrieve the authenticated user
        $user = Auth::user();
    
        // Validate the request data, assuming you have a form field named 'password'
        $request->validate([
            'password' => ['required', Password::min(8)->mixedCase()->numbers()->symbols()],
        ]);
    
        // Update the user's password
        $user->password = bcrypt($request->input('password'));
        $user->save();

        $this->storeLog('User password updated', 'user', "User ID: {$user->id}", 'users');
    
        return response(['success' => 'Password updated successfully']);
    }
    

    //Change Password========================================================================
    public function changepassword(Request $request)
    {
        // Use input() method to get the value of the "email" parameter from the request
        $email = $request->input('email');
    
        // Check if the email parameter is present
        if ($email) {
            $users = User::where('email', $email)->get();
        
            if ($users->count() > 0) {
                // Generate a random password
                $newPassword = Str::random(8); // You can adjust the length as needed
            
                // Update the password for each user
                foreach ($users as $user) {
                    $user->password = bcrypt($newPassword);
                    $user->update();
                }
            
                // Additional logic if needed

                //$this->storeLog('User password changed', 'user', "User ID: {$user->id}", 'users');
            
                return response()->json(['success' => true, 'message' => 'Password Changed', 'new_password' => $newPassword]);
            } else {
                return response()->json(['success' => false, 'message' => 'User not found']);
            }
        } else {
            return response()->json(['success' => false, 'message' => 'Email parameter missing']);
        }
    }

    // for archive user
    public function archiveUser(Request $request, $userId)
    {
        try {
            // Find the user by ID or fail with a 404 response if not found
            $user = User::findOrFail($userId); 

            //update the student_profile and employee_profile
            if($user['role'] === 4){
                $userProfile = student_profile::where('user_id', $userId)->firstOrFail();
                $userprofileID = $userProfile['student_profile_id'];
                $userProfile = student_profile::findOrFail($userprofileID);

                $userProfile->archived = 1;
                $userProfile->save();

                $userTableName = (new student_profile)->getTable();

                $itemType = class_basename($userProfile);
                $this->storeLog('User archived', 'user', "User ID: {$user->id}", $itemType);

                 // Create an Archive instance // make one for all archiveable items
                $archive = new archive;
                $archive->item_id = $userprofileID;
                $archive->item_name = $user->name;
                $archive->item_type = $itemType;
                $archive->origin_table = $userTableName;
                $archive->archiver_id = auth()->user()->id; // Assuming you have user authentication 
                $archive->archiver_name = auth()->user()->name; 
                $archive->archiver_role = auth()->user()->role; 
                //save to archives table
                $archive->save();

                $user->archived = 1;
                $user->save();
            } else {
                $userProfile = employee_profile::where('user_id', $userId)->firstOrFail();
                $userprofileID = $userProfile['id'];
                $userProfile = employee_profile::findOrFail($userprofileID);

                $userProfile->archived = 1;
                $userProfile->save();

                $userTableName = (new employee_profile)->getTable();

                $itemType = class_basename($userProfile);
                $this->storeLog('User archived', 'user', "User ID: {$user->id}", $itemType);

                 // Create an Archive instance // make one for all archiveable items
                $archive = new archive;
                $archive->item_id = $userprofileID;
                $archive->item_name = $user->name;
                $archive->item_type = $itemType;
                $archive->origin_table = $userTableName;
                $archive->archiver_id = auth()->user()->id; // Assuming you have user authentication 
                $archive->archiver_name = auth()->user()->name; 
                $archive->archiver_role = auth()->user()->role; 
                //save to archives table
                $archive->save();

                $user->archived = 1;
                $user->save();
            }

            
            //$userTableName = (new User)->getTable(); //getting table associated w/ User model

            // Get the name of the current model
            //$itemType = class_basename($user);

           

            //$this->storeLog('User archived', 'user', "User ID: {$user->id}", 'users');
    
            return response()->json(['message' => 'User archived successfully']);
        } catch (\Exception $e) {
            // Handle exceptions, e.g., log the error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    // COPY FOR ALL CONTROLLERS WITH ARCHIVE
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
