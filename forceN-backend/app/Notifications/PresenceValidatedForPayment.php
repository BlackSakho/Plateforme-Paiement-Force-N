<?php

namespace App\Notifications;

use App\Models\Presence;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class PresenceValidatedForPayment extends Notification implements ShouldQueue
{
    use Queueable;

    public $presence;

    public function __construct(Presence $presence)
    {
        $this->presence = $presence;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Vous êtes autorisé à recevoir un paiement 💰')
            ->greeting('Bonjour ' . $notifiable->firstname)
            ->line('Votre rapport du ' . $this->presence->date . ' a été validée par le service finance.')
            ->line('Vous êtes maintenant autorisé à recevoir un paiement.')
            ->action('Voir mes fiches', url('http://localhost:4200/user-attendance')) // adapte l’URL si besoin
            ->line('Merci pour votre engagement avec FORCE-N !');
    }
}
