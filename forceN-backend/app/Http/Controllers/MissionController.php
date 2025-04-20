<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    // Récupérer toutes les missions
    public function index()
    {
        $missions = Mission::with('mentor:id,firstname,name')->get();
        return response()->json($missions);
    }

    // Créer une nouvelle mission
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required',
            'mentor_id' => 'required|exists:users,id',
            'status' => 'required|in:pending,active,completed',
        ]);

        // Convertir la date au format MySQL (YYYY-MM-DD)
        $validatedData['date'] = date('Y-m-d', strtotime($validatedData['date']));

        // Créer la mission
        $mission = Mission::create($validatedData);

        return response()->json(['message' => 'Mission créée avec succès', 'mission' => $mission], 201);
    }

    // Mettre à jour le statut d'une mission
    public function updateStatus(Request $request, $id)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:pending,active,completed',
        ]);

        $mission = Mission::findOrFail($id);
        $mission->status = $validatedData['status'];
        $mission->save();

        return response()->json(['message' => 'Statut mis à jour avec succès', 'mission' => $mission], 200);
    }

    public function getMentorMissions(Request $request)
    {
        // Récupérer l'utilisateur connecté
        $mentor = $request->user();

        // Vérifier si l'utilisateur est un mentor
        if ($mentor->role !== 'mentor') {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        // Récupérer les missions assignées au mentor connecté
        $missions = Mission::where('mentor_id', $mentor->id)->get();

        return response()->json($missions, 200);
    }
}
