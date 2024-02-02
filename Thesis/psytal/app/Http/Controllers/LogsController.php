<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\logs;

class LogsController extends Controller
{
    /**
     * Display a listing of the resource.
     * rem was here
     */
    public function index()
    {
        // Retrieve all logs starting from the most recent
        $logs = logs::orderBy('date', 'desc')->get();
        return response()->json($logs);
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
    public function show(logs $logs)
    {
        // order by descending order (most recent first)
        // send three items only
        //$logs = logs::orderBy('date', 'desc')->take(3)->get();
        $logs = logs::orderBy('date', 'desc')->get();
        return response()->json($logs);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(logs $logs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, logs $logs)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(logs $logs)
    {
        //30-90 days lifetime
        //print button
        //delete
    }
}
