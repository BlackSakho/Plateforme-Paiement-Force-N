<?php

namespace App\Listeners;

use App\Events\PresenceSubmitted;
use App\Events\PresenceValidatedByConsultant;
use App\Events\PresenceValidatedByAccountant;
use App\Models\User;
use App\Notifications\PresenceNotification;

class SendPresenceNotification
{
    public function __construct()
    {
        //
    }

    public function handle($event)
    {
        $message = '';

        if ($event instanceof PresenceSubmitted) {
            $message = 'Un nouveau rapport a été soumise par ' . $event->presence->mentor->firstname;
            $users = User::where('role', 'consultant')->get(); // Envoyer aux consultants
        } elseif ($event instanceof PresenceValidatedByConsultant) {
            $message = 'Un rapport a été validée par le consultant.';
            $users = User::where('role', 'comptable')->get(); // Envoyer aux comptables
        } elseif ($event instanceof PresenceValidatedByAccountant) {
            $message = 'Paiement autorisé par le comptable.';
            $users = User::where('role', 'mentor')->get(); // Envoyer aux administrateurs
        }

        foreach ($users as $user) {
            $user->notify(new PresenceNotification($message));
        }
    }
}
