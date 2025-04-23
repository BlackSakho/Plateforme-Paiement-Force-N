<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Presence;
use App\Models\Invoice;
use App\Notifications\FactureEnvoyee;

class InvoiceController extends Controller
{
    public function generateInvoice(Request $request)
    {
        $presenceId = $request->input('presenceId');
        $presence = Presence::with('mentor', 'validatedBy')->findOrFail($presenceId);

        // Générer une facture
        $invoice = Invoice::create([
            'presence_id' => $presence->id,
            'mentor_name' => $presence->mentor->firstname . ' ' . $presence->mentor->name,
            'accountant_name' => $presence->validatedBy->firstname . ' ' . $presence->validatedBy->name,
            'amount' => 100000, // Exemple : montant associé à la fiche
            'date' => now(),
        ]);

        // Retourner une réponse avec l'URL de la facture (si applicable)
        return response()->json([
            'message' => 'Facture générée avec succès.',
            'invoiceId' => $invoice->id,
            'invoiceUrl' => url("/invoices/{$invoice->id}/download"), // Exemple d'URL
        ]);
    }
    public function sendToMentor($id)
    {
        $invoice = Invoice::with('presence.mentor')->findOrFail($id);
        $mentor = $invoice->presence?->mentor;

        if ($mentor && $mentor->email) {
            $mentor->notify(new FactureEnvoyee($invoice));
            return response()->json(['message' => 'Facture envoyée au mentor.']);
        }


        return response()->json(['message' => 'Aucun mentor associé.'], 400);
    }
    public function show($id)
    {
        $invoice = Invoice::with('presence.mentor')->find($id);

        if (!$invoice) {
            return response()->json(['message' => 'Facture introuvable'], 404);
        }

        return response()->json($invoice);
    }
}
