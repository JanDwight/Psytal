<?php

namespace App\Http\Controllers;

use App\Http\Requests\PreRegistrationIncomingTmpRequest;
use App\Models\email_domains;
use App\Models\preregistration_incoming_tmp;
use App\Models\logs;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PreregistrationIncomingTmpController extends Controller
{
    public function createIncomingPreReg(PreRegistrationIncomingTmpRequest $request)
    {
        $data = $request->validated();

        // Extract everything after '@' in the email address
        $emailParts = explode('@', $data['email_address']);
        $domain = '@' . end($emailParts);

        // Check if the email domain already exists
        $existingDomain = email_domains::where('email_domains', $domain)->first();

        if (!$existingDomain) {
            return response([
                'message' => 'Email Domain Not Valid',
                'success' => false
            ]);
        }
        
        $preRegTmpincoming = preregistration_incoming_tmp::create([
            'start_of_school_year' => $data['start_of_school_year'],
            'end_of_school_year' => $data['end_of_school_year'],
            'user_id'=> $data['user_id'],
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
            'health_facility_registered' => $data['health_facility_registered'],
            'parent_health_facility_dependent' => $data['parent_health_facility_dependent'],
            'vaccination_status' => $data['vaccination_status'],
            'technology_level' => $data['technology_level'],
            'digital_literacy' => $data['digital_literacy'],
            'avail_free_higher_education' => $data['avail_free_higher_education'],
            'voluntary_contribution' => $data['voluntary_contribution'],
            'contribution_amount' => $data['contribution_amount'],
            'complied_to_admission_policy' => $data['complied_to_admission_policy'],
            'pre_reg_status' => $data['pre_reg_status'],
            'type_of_student' => $data['type_of_student'],
            'student_status' => $data['student_status'],
            'semester' => $data['semester']
        ]);

        $fullName = $data['last_name'] . ', ' . $data['first_name'] . ' ' . $data['middle_name'] . '.';

        $this->storeLog('New pre-registration (Incoming)', 'pre-registration', $fullName, 'preregistration', $fullName, $data['user_id'], 4 );

        return response([
            'message' => 'Congratulations! You have finished your pre-registration. Here is a pdf copy of your form. Print and show this to the admission officer for further instructions.',
            'success' => true
        ]);
    }

    public function createContinuingPreReg(PreRegistrationIncomingTmpRequest $request)
    {
        // Get the ID of the currently logged-in user
        $userId = Auth::id();
        $data = $request->validated();

         // Extract everything after '@' in the email address
         $emailParts = explode('@', $data['email_address']);
         $domain = '@' . end($emailParts);
 
         // Check if the email domain already exists
         $existingDomain = email_domains::where('email_domains', $domain)->first();
 
         if (!$existingDomain) {
             return response([
                 'message' => 'Email Domain Not Valid',
                 'success' => false
             ]);
         }

        $preRegTmpincoming = preregistration_incoming_tmp::create([
            'start_of_school_year' => $data['start_of_school_year'],
            'end_of_school_year' => $data['end_of_school_year'],
            'student_school_id' => $data['student_school_id'],
            'semester' => $data['semester'],
            'user_id'=> $userId,
            'last_name' => $data['last_name'],
            'first_name' => $data['first_name'],
            'middle_name' => $data['middle_name'],
            'maiden_name' => $data['maiden_name'],
            'year_level' => $data['year_level'],
            'degree' => $data['degree'],
            'major' => $data['major'],
            'candidate_for_graduation' => $data['candidate_for_graduation'],
            'end_of_term_to_finnish_degree' => $data['end_of_term_to_finnish_degree'],
            'last_of_term_to_finnish_degree' => $data['last_of_term_to_finnish_degree'],
            'date_of_birth' => $data['date_of_birth'],
            'citizenship' => $data['citizenship'],
            'ethnicity' => $data['ethnicity'],
            'contact_number' => $data['contact_number'],
            'place_of_birth' => $data['place_of_birth'],
            'sex_at_birth' => $data['sex_at_birth'],
            'special_needs' => $data['special_needs'],
            'email_address' => $data['email_address'],
            'home_address' => $data['home_address'],
            'address_while_studying' => $data['address_while_studying'],
            'health_facility_registered' => $data['health_facility_registered'],
            'parent_health_facility_dependent' => $data['parent_health_facility_dependent'],
            'vaccination_status' => $data['vaccination_status'],
            'technology_level' => $data['technology_level'],
            'digital_literacy' => $data['digital_literacy'],
            'avail_free_higher_education' => $data['avail_free_higher_education'],
            'voluntary_contribution' => $data['voluntary_contribution'],
            'contribution_amount' => $data['contribution_amount'],
            'complied_to_admission_policy' => $data['complied_to_admission_policy'], //
            'contact_person_name' => $data['contact_person_name'],
            'contact_person_number' => $data['contact_person_number'],
            'contact_person_address' => $data['contact_person_address'],
            'contact_person_relationship' => $data['contact_person_relationship'],
            'section' => $data['section'],
            'pre_reg_status' => $data['pre_reg_status'],
            'student_status' => $data['student_status'], //
            'type_of_student' => $data['type_of_student'], 
        ]);

        $fullName = $data['last_name'] . ', ' . $data['first_name'] . ' ' . $data['middle_name'] . '.';

        $this->storeLog('New pre-registration (Continuing)', 'pre-registration', $fullName, 'preregistration', auth()->user()->name, auth()->user()->id, auth()->user()->role );

        return response([
            'prereg' => $preRegTmpincoming,
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $PreReg = DB::table('preregistration_incoming_tmps')
         ->get();

         
         $PreReg = $PreReg->map(function ($item) {
            // Extract the first character of the middle_name
            $middleInitial = strtoupper(substr($item->middle_name, 0, 1));
            $year_level = $item->year_level;
            $semester = $item->semester;
            // Convert created_at to a Carbon instance and format it to display only the date
            $item->created_at = Carbon::parse($item->created_at)->toDateString();
            //Combine the last, first and middle name into a fullname
            $item->full_name = $item->last_name . ', ' . $item->first_name . ' ' . $middleInitial .'.';
            //$item->new_student = ($item->year_level === '1' || $item->year_level === null) && ($item->semester === '1st Semester' || $item->semester === null) ? 'Incoming' : 'Continuing';
            $item->new_student = $item->type_of_student;
            return $item ;
             
        });

            return $PreReg->toArray();
    }

    public function index2(Request $request)
    {

        $PreReg = DB::table('preregistration_incoming_tmps')
         ->get();

         
         $PreReg = $PreReg->map(function ($item) {
            // Extract the first character of the middle_name
            $middleInitial = strtoupper(substr($item->middle_name, 0, 1));
            $year_level = $item->year_level;
            $semester = $item->semester;
            // Convert created_at to a Carbon instance and format it to display only the date
            $item->created_at = Carbon::parse($item->created_at)->toDateString();
            //Combine the last, first and middle name into a fullname
            $item->full_name = $item->last_name . ', ' . $item->first_name . ' ' . $middleInitial .'.';
            //$item->new_student = ($item->year_level === '1' || $item->year_level === null) && ($item->semester === '1st Semester' || $item->semester === null) ? 'Incoming' : 'Continuing';
            $item->new_student = $item->type_of_student;
            return $item ;
             
        });

            // Filter the collection to include only 'Incoming' students
            $PreReg = $PreReg->filter(function ($item) {
                return $item->new_student === 'Continuing';
            });

            return $PreReg->toArray();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        
        $preregData = preregistration_incoming_tmp::find($id);
        

    if (!$preregData) {
        // Handle the case where the preregID with the provided ID is not found
        return response()->json(['message' => 'Form not found'], 404);
    }

    // Extract the attributes from the request
    $data = $request->all();
    $prStatus = $data['pre_reg_status'];

    //if $data['pre_reg_status'] is "Declined"
    
    $preregData->update($data);
    
    $fullName = $preregData['last_name'] . ', ' . $preregData['first_name'] . ' ' . $preregData['middle_name'];

    $this->storeLog('Pre-registration ' . $prStatus, 'pre-registration', $fullName, 'preregistration', auth()->user()->name, auth()->user()->id, auth()->user()->role );

    return response()->json(['message' => 'User updated successfully']);
    }

    /**
     * Create profile for the accepted student
     */
    public function acceptprereg(){

    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(preregistration_incoming_tmp $validatedData)
    {
        //
    }

    public function storeLog($actionTaken, $itemType, $itemName, $itemOrigin, $userName, $userId, $userType)
    {
        // Create a new Log instance
        $logs = logs::create([
            'action_taken' => $actionTaken,
            'item_type' => $itemType,
            'item_name' => $itemName,
            'item_origin' => $itemOrigin,
            'user_name' => $userName,
            'user_id' => $userId,
            'user_type' => $userType,
        ]);

        // Optionally, you can return the created log instance
        return $logs;
    }
}
