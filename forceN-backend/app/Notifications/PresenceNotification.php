<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class PresenceNotification extends Notification
{
    use Queueable;

    private $message;

    public function __construct($message)
    {
        $this->message = $message;
    }

    public function via($notifiable)
    {
        return ['database']; // Stocker dans la base de données
    }

    public function toArray($notifiable)
    {
        return [
            'message' => $this->message,
        ];
    }
}