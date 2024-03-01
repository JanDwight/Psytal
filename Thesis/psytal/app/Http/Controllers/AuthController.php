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
        $data['name'] = implode(' ', array_filter([$data['last_name'] . ',', $data['first_name'], isset($data['middle_name']) ? strtoupper(substr($data['middle_name'], 0, 1)) . '.' : '']));


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
        if ($data['role'] != 4) {
            // Employee Profile
            employee_profile::create([
                'user_id' => $user->id,
                'employee_id' => 0,
                'last_name' => $data['last_name'],
                'first_name' => $data['first_name'],
                'middle_name' => $data['middle_name'],
                'role' => $data['role'],
                'email_address' => $data['email'],
            ]);
        }
        $token = $user->createToken('main')->plainTextToken;
        //else here for student profile?

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
