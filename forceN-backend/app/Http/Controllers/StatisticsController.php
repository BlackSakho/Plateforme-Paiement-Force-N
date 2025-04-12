<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Mission;
use App\Models\Presence;

class StatisticsController extends Controller
{
    public function getStatistics()
    {
        $consultantCount = User::where('role', 'consultant')->count();
        $mentorCount = User::where('role', 'mentor')->count();
        $missionCount = Mission::count();
        $presenceCount = Presence::count();

        return response()->json([
            'consultants' => $consultantCount,
            'mentors' => $mentorCount,
            'missions' => $missionCount,
            'presences' => $presenceCount,
        ]);
    }
}
