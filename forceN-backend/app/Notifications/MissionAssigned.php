<?php

namespace App\Notifications;

use App\Models\Mission;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class MissionAssigned extends Notification implements ShouldQueue
{
    use Queueable;

    public $mission;

    public function __construct(Mission $mission)
    {
        $this->mission = $mission;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Nouvelle mission assignée')
            ->greeting('Bonjour ' . $notifiable->firstname)
            ->line('Une nouvelle mission vous a été assignée :')
            ->line('📌 Titre : ' . $this->mission->title)
            ->line('📝 Description : ' . $this->mission->description)
            ->line('📅 Date : ' . $this->mission->date . ' à ' . $this->mission->time)
            ->action('Voir mes missions', url('http://localhost:4200/missions')) // adapte selon ton frontend
            ->line('Merci de votre collaboration avec FORCE-N !.');
    }
}