<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddUserRequest;
use App\Http\Requests\LoginRequest;
use App\Models\email_domains;
use App\Models\employee_profile;
use App\Models\student_profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class AuthController extends Controller
{
    public function getUserDetails() {
        // Retrieve the authenticated user
        $user = Auth::user();

        if ($user) {
            // User details found
            return response()->json($user);
        } else {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    }

    public function addUser(AddUserRequest $request) {
        $data = $request->validated();

        $name = $request->input('name');

        // Break down the name into firstName, lastName, and middleInitial
        $nameParts = explode(' ', $name);
        $firstName = '';
        $lastName = '';
        $middleName = '';
        $middleInitial = '';

        $namePartsCount = count($nameParts);

        if ($namePartsCount > 0) {
            $lastName = rtrim($nameParts[0], ',');
        }

        if ($namePartsCount > 1) {
            // Extract the last word as the middle name
            $middleName = end($nameParts);
        
            // Save only the first character as the middle initial
            $middleInitial = substr($middleName, 0, 1);
        }

        if ($namePartsCount > 2) {
            // Remove the middleName from the firstName
            $firstName = implode(' ', array_slice($nameParts, 1, $namePartsCount - 2));
        }
        
        // Extract everything after '@' in the email address
        $emailParts = explode('@', $data['email']);
        $domain = '@' . end($emailParts);

        // Check if the email domain already exists
        $existingDomain = email_domains::where('email_domains', $domain)->first();

        if (!$existingDomain) {
            return response([
                'error' => 'Email Domain Not Valid',
            ], 422);
        }

        // Update $data['name'] with $lastName, $firstName, $middleName
        $data['name'] = implode(' ', array_filter([$lastName . ',', $firstName, $middleInitial . '.']));

        $user = User::create([
            'name' => $data['name'],
            'password' => bcrypt($data['password']),
            'role' => $data['role'],
            'email' => $data['email'],
        ]);

        // Perform the search based on the provided name
        $users = User::where('name', 'like', '%' . $data['name'] . '%')->get();
        
        if ($users->isEmpty()) {
            return response([
                'message' => 'No users found with the provided name.',
            ], 404);
        }

        // Create profile based on user role
        if ($data['role'] == 4) {
            // Student Profile
            student_profile::create([
                'user_id' => $user->id,
                'student_school_id' => 0,
                'last_name' => $lastName,
                'first_name' => $firstName,
                'middle_name' => $middleName,
                'email_address' => $data['email'],
                'archived' => 0
                // Add other student profile fields here
            ]);
        } else {
            // Employee Profile
            employee_profile::create([
                'user_id' => $user->id,
                'employee_id' => 0,
                'last_name' => $lastName,
                'first_name' => $firstName,
                'middle_name' => $middleName,
           ]);
        }

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
            'domain' => $domain
        ]);
    }

    public function login(LoginRequest $request) {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The provided credentials are not correct'
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        $role = $user->role;
        $userName = $user->name;

        return response([
            'user_name' => $userName,
            'token' => $token,
            'role' => $role
        ]);
    }

    public function logout(Request $request) {
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }
}
