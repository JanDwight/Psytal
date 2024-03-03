<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailDomains;
use App\Models\email_domains;
use App\Models\logs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmailDomainsController extends Controller
{
    public function index(Request $request)
    {
        // Retrieve all records from the database using the model
        $items = email_domains::all();

        // Pass the retrieved data to the view
        return response([$items]);         
    }
    public function addEmailDomain(EmailDomains $request)
    {
        $data = $request->validated();

        // Check if the email domain already exists
        $existingDomain = email_domains::where('email_domains', $data['email_domains'])->first();

        if ($existingDomain) {
            // Email domain already exists, return an error response
            return response([
                'error' => 'Email Domain already exists',
            ], 422); // You can choose an appropriate HTTP status code

        } else {
            // Email domain doesn't exist, proceed with creating a new one
            $emailDomains = email_domains::create([
                'email_domains' => $data['email_domains']
            ]);

            $this->storeLog('Email domain added', 'email domain', $data['email_domains'], 'email_domains');

            return response([
                'success' => 'Email Domain Added',
            ]);
        }
    }

    public function updateemaildomain(Request $request, $id)
    {
        $emailDomain = email_domains::find($id);

        if($emailDomain){
             // Extract the attributes from the request
            $attributes = $request->all();
    
            $emailDomain->update($attributes); 

            $this->storeLog('Email domain updated', 'email domain', $emailDomain->email_domains, 'email_domains');

            return response([
                'success' => 'Email Domain Updated',
            ]);
        }
        return response([
            'error' => 'something Went Wrong',
        ]);
    }
    public function getAllEmailDomains()
    {
        // Retrieve all email domains from the database using the model
        $emailDomains = email_domains::all();

        return response()->json($emailDomains);
    }

    public function deleteEmailDomain($id)
    {
    try {
        $emailDomain = email_domains::findOrFail($id);
        $emailDomain->delete();

        $this->storeLog('Email domain removed', 'email domain', $emailDomain->email_domains, 'email_domains');

        return response()->json(['message' => 'Email Domain deleted successfully']);
        } catch (\Exception $e) {
        return response()->json(['message' => 'Error deleting email domain: ' . $e->getMessage()], 500);
        }
    }

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
