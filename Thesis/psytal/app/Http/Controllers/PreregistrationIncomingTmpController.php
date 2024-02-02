<?php

namespace App\Http\Controllers;

use App\Http\Requests\PreRegistrationIncomingTmpRequest;
use App\Models\email_domains;
use App\Models\preregistration_incoming_tmp;
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
                'error' => 'Email Domain Not Valid',
            ], 422);
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
            'student_status' => $data['student_status']
        ]);

        

        return response([
            'prereg' => $preRegTmpincoming,
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
                 'error' => 'Email Domain Not Valid',
             ], 422);
         }

        $preRegTmpincoming = preregistration_incoming_tmp::create([
            'start_of_school_year' => $data['start_of_school_year'],
            'end_of_school_year' => $data['end_of_school_year'],
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
            'complied_to_admission_policy' => $data['complied_to_admission_policy'],
            'contact_person_name' => $data['contact_person_name'],
            'contact_person_number' => $data['contact_person_number'],
            'contact_person_address' => $data['contact_person_address'],
            'contact_person_relationship' => $data['contact_person_relationship'],
            'section' => $data['section'],
            'pre_reg_status' => $data['pre_reg_status'],
            'student_status' => $data['student_status'],
            'type_of_student' => $data['type_of_student'],
        ]);

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
            // Convert created_at to a Carbon instance and format it to display only the date
            $item->created_at = Carbon::parse($item->created_at)->toDateString();
            //Combine the last, first and middle name into a fullname
            $item->full_name = $item->last_name . ', ' . $item->first_name . ' ' . $middleInitial .'.';
            return $item;
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
    
    $preregData->update($data);  
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
}
