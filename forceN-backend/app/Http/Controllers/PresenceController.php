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

        $presence = Presence::create($data);

        return response()->json(['message' => 'Présence enregistrée', 'presence' => $presence], 201);
    }
}
