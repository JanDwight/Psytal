<?php

namespace App\Http\Controllers;

use App\Mail\PreRegContinuingAccepted;
use App\Mail\SendPassword;
use App\Mail\ForgotPasswordInputEmail;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use App\Models\logs;
use Mail;
use App\Mail\DeclinedApplication;

class SendStudentAccountPasswordController extends Controller
{
    public function sendstudentaccountpassword(Request $request)
    {
        $studentInfo = $request->query();

        $data = 
        [
            'title'=>'PSYTAL: Welcome to Department of Psychology - Benguet State University',
            'body'=> 'Congratulations, you are now a part of Department of Psychology. To login in the student portal please use your Full Name following this format (Lastname, Firstname, M.I.) and for your Password "'  . $studentInfo['password'] . '". Thank you'
        ];
        try {
            Mail::to($studentInfo['email'])->send(new SendPassword($data));

            if ($studentInfo['role'] === '4'){
                $fullName = $studentInfo['fullName'];

                $this->storeLog('Account password sent', 'Student password', $studentInfo['email'], 'users', $fullName, $fullName, $studentInfo['role'] );
            } else {
                $this->storeLog('Account password sent', 'User password', $studentInfo['email'], 'users', $studentInfo['fullName'], $studentInfo['fullName'], $studentInfo['role'] );
            }

            return response()->json([
                'success' => true,
                'message' => 'User Successfully Created',
            ]);
        }
        catch(Exception $e)
        {
          return response()->json([
            'success' => false,
            'message' => 'Somthing Went Wrong. Please Try Again Later', $e->getMessage()
          ]);
        } 
    }

    public function forgotpasswordsendemail(Request $request)
    {
        try {
            $formData = $request->query(); // Ensure you're getting the email correctly

            $email = User::where('email', $formData['email'])->firstOrFail();

            if (!$email){
                return response()->json([
                ]);
            }

            $data = [
                'title' => 'PSYTAL: FORGOT PASSWORD REQUEST',
                'body'  => 'You have requested to change your password. To verify this action use this code. "' . $formData['code']. '" Thank you.'
            ];

            Mail::to($formData['email'])->send(new ForgotPasswordInputEmail($data)); // Make sure the SendPassword class is correct

            $this->storeLog('Account password: Forgot password request', 'user password', $formData['email'], 'users', $formData['email'], 'forgot password request', 'user');

            // You might want to log a success message or return a different response for success
            return response()->json([
                'success' => true,
                'message' => 'Email sent successfully. Kindly check your email, before going back to this site.'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Email is not Registered'
            ]);
        }
    }

    public function sendnewpassword(Request $request)
    {
        $formData = $request->query();

        $newPassword = $formData['newPassword']; // Access the specific parameter

        $data = [
            'title' => 'PSYTAL: CHANGE PASSWORD REQUEST',
            'body' => 'You have successfully verify your request to change your password.  To login in the student portal please use your Full Name following this format (Lastname, Firstname, M.I.) and use this new Password: "' . $newPassword . '". You can change your password in the ---PROFILE--- feature after logging into your account. Thank You.'
        ];

        try {
            Mail::to($formData['email'])->send(new SendPassword($data));

            $this->storeLog('Account password: Password changed', 'user password', $formData['email'], 'users', $formData['email'], 'new password', 'user');

            return response()->json([
                'success' => true,
                'message' => 'Your password was changed successfully!\n Please check your email for your new password.']);
        } catch (Exception $e) {
            return response()->json(['error' => 'Email sending failed. Please try again later.']);
        }
    }

    public function declined(Request $request) {
        $studentInfo = $request->query();
    
        $data = [
            'title' => 'PSYTAL: Department of Psychology - Benguet State University',
            'body' => 'Sorry, your application has been declined, please contact the department via email: css.psychology@bsu.edu.ph or message on https://www.facebook.com/psychologybsu'
        ];
    
        try {
            // Send the mail
            Mail::to($studentInfo['email'])->send(new DeclinedApplication($data));
        
            return response()->json([
                'success' => true,
                'message' => 'Mail sent successfully.',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again later.',
                'error' => $e->getMessage(),
            ]);
        }        
    }

    public function preRegContinuingAccepted(Request $request) {
        $studentInfo = $request->query();
    
        $data = [
            'title' => 'PSYTAL: Department of Psychology - Benguet State University',
            'body' => 'Congratulations, your application has been Accepted, For more inquiries please contact the department via email: css.psychology@bsu.edu.ph or message on https://www.facebook.com/psychologybsu'
        ];
    
        try {
            // Send the mail
            Mail::to($studentInfo['email'])->send(new PreRegContinuingAccepted($data));
        
            return response()->json([
                'success' => true,
                'message' => $studentInfo,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again later.',
                'error' => $e->getMessage(),
            ]);
        }        
    }
    public function storeLog($actionTaken, $itemType, $itemName, $itemOrigin, $user_name, $user_id, $user_role)
    {
        // Create a new Log instance
        $logs = logs::create([
            'action_taken' => $actionTaken,
            'item_type' => $itemType,
            'item_name' => $itemName,
            'item_origin' => $itemOrigin,
            'user_name' => $user_name,
            'user_id' => $user_id,
            'user_type' => $user_role
        ]);

        // Optionally, you can return the created log instance
        return $logs;
    }
    //pending test
}
