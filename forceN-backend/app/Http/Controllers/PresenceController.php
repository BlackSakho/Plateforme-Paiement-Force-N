<?php

namespace App\Http\Controllers;

use App\Models\Presence;
use Illuminate\Http\Request;

class PresenceController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'time' => 'required',
            'cours' => 'required',
            'faith_declaration' => 'required|boolean'
        ]);

        // Convertir la date au format 'YYYY-MM-DD'
        $data = $request->all();
        $data['date'] = date('Y-m-d', strtotime($request->date));
        $data['mentor_id'] = $request->user()->id; // Associer l'utilisateur authentifié

        $presence = Presence::create($data);

        return response()->json(['message' => 'Présence enregistrée', 'presence' => $presence], 201);
    }

    public function index()
    {
        $presences = Presence::with('mentor')->get(); // Inclure les informations du mentor
        return response()->json($presences);
    }

    public function validateByConsultant($id)
    {
        $presence = Presence::findOrFail($id);
        $presence->validated_by_consultant = true;

        // Vérifiez si tous les rôles ont validé
        if ($presence->validated_by_consultant && $presence->validated_by_certificate_manager && $presence->validated_by_finance) {
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
        $presence = Presence::findOrFail($id);
        $presence->validated_by_finance = true;

        // Vérifiez si tous les rôles ont validé
        if ($presence->validated_by_consultant && $presence->validated_by_certificate_manager && $presence->validated_by_finance) {
            $presence->status = 'validated'; // Mettre à jour le statut global
        }

        $presence->save();

        return response()->json(['message' => 'Validé par le service finance', 'presence' => $presence], 200);
    }
}