<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Invoice;

class FactureEnvoyee extends Notification implements ShouldQueue
{
    use Queueable;

    public Invoice $facture;

    public function __construct(Invoice $facture)
    {
        $this->facture = $facture;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $cours = $this->facture->presence->cours ?? 'Non spécifié';
        $montant = number_format($this->facture->amount, 0, ',', ' ') . ' FCFA';

        return (new MailMessage)
            ->subject('Votre facture est disponible')
            ->line("Votre facture est prête pour le cours : **{$cours}**")
            ->line("Montant : {$montant}")
            ->action('Consulter votre espace mentor', url('/espace-mentor')) // adapte l'URL
            ->line('Merci pour votre engagement avec FORCE-N !');
    }
}