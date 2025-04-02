<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MissionController extends Controller
{
    public function mission(Request $request)
    {
        $user = $request->user();
        $mission = $user->missions()->create([
            'consultant_id' => $user->id,
            'titre' => $request->titre,
            'description' => $request->description,
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,


        ]);

        return response()->json($mission);
    }
    public function getmission(Request $request){
        $mission = $request-> missions();
    }
}
