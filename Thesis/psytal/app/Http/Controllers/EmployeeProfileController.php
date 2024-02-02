<?php

namespace App\Http\Controllers;

use App\Models\employee_profile;
use App\Models\User;

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
                'full_name' => $fullName,
                'email_address' => $userRole ? $userRole['email'] : 'n/a',
                'role' => $userRole ? $userRole['role'] : 'n/a',
            ];
        }
    
        return response()->json($userList);
    }

}
