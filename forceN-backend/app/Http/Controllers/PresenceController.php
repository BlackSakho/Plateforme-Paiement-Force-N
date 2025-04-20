<?php

namespace App\Http\Controllers;

use App\Models\Presence;
use Illuminate\Http\Request;

class PresenceController extends Controller
{

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'date' => 'required|date',
            'time' => 'required',
            'cours' => 'required|string',
            'notes' => 'nullable|string',
            'faith_declaration' => 'required|boolean',
        ]);

        // Convertir la date au format attendu par MySQL
        $validatedData['date'] = date('Y-m-d', strtotime($validatedData['date']));

        // Ajouter l'ID du mentor connecté
        $validatedData['mentor_id'] = $request->user()->id;

        // Créer la feuille de présence
        $presence = Presence::create($validatedData);

        return response()->json(['message' => 'Présence enregistrée avec succès', 'presence' => $presence], 201);
    }

    public function index()
    {
        // Inclure les informations du mentor avec first_name et name
        $presences = Presence::with(['mentor:id,firstname,name'])->get();
        return response()->json($presences);
    }

    public function getUserPresences(Request $request)
    {
        $userId = $request->user()->id; // Récupérer l'ID de l'utilisateur connecté

        // Récupérer les fiches de présence soumises par cet utilisateur
        $presences = Presence::where('mentor_id', $userId)->get();

        return response()->json($presences, 200);
    }

    public function validateByConsultant($id)
    {
        $presence = Presence::findOrFail($id);
        $presence->validated_by_consultant = true;

        // Vérifiez si tous les rôles ont validé
        if ($presence->validated_by_consultant && $presence->validated_by_finance) {
            $presence->status = 'validated'; // Mettre à jour le statut global
        }

        $presence->save();

        return response()->json(['message' => 'Validé par le consultant', 'presence' => $presence], 200);
    }

    public function validateByCertificateManager($id)
    {
        $presence = Presence::findOrFail($id);
        $presence->validated_by_certificate_manager = true;

        // Vérifiez si tous les rôles ont validé
        if ($presence->validated_by_consultant && $presence->validated_by_certificate_manager && $presence->validated_by_finance) {
            $presence->status = 'validated'; // Mettre à jour le statut global
        }

        $presence->save();

        return response()->json(['message' => 'Validé par le responsable certificat', 'presence' => $presence], 200);
    }

    public function validateByFinance($id)
    {
        // Récupérer la fiche de présence par son ID
        $presence = Presence::findOrFail($id);

        // Mettre à jour la validation par le service finance
        $presence->validated_by_finance = true;

        // Vérifiez si tous les rôles ont validé
        if ($presence->validated_by_consultant && $presence->validated_by_finance) {
            $presence->status = 'validated'; // Mettre à jour le statut global
        }

        // Sauvegarder les modifications dans la base de données
        $presence->save();

        // Retourner une réponse JSON
        return response()->json([
            'message' => 'Fiche validée par le service finance',
            'presence' => $presence,
        ], 200);
    }

    public function getConsultantValidatedPresences()
    {
        $presences = Presence::where('validated_by_consultant', true)
            ->with(['mentor:id,firstname,name'])
            ->get()
            ->map(function ($presence) {
                // Ajouter la propriété validated_by_finance si elle est absente
                if (!isset($presence->validated_by_finance)) {
                    $presence->validated_by_finance = false;
                }
                return $presence;
            });

        return response()->json($presences, 200);
    }
}
