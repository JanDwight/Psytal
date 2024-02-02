<?php

namespace App\Http\Controllers;

use App\Http\Requests\TmpPreRegistrationRequest;
use App\Models\tmp_preregistration;
use Illuminate\Http\Request;

class TmpPreregistrationController extends Controller
{

    public function createTmpPreReg(TmpPreRegistrationRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */

        $tmpPreReg = tmp_preregistration::create([
            'family_name' => $data['family_name']
        ]);

        return response([
            'family_name' => $tmpPreReg,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(tmp_preregistration $tmp_preregistration)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(tmp_preregistration $tmp_preregistration)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, tmp_preregistration $tmp_preregistration)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(tmp_preregistration $tmp_preregistration)
    {
        //
    }
}
