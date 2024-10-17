<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;
use App\Models\Driver;
use App\Models\Team;
use Illuminate\Support\Facades\Log;

class LiveUpdateController extends Controller
{
    /**
     * Get live update
     */
    public function getLiveUpdate()
    {
        Log::info("Live update requested");

        return response()->stream(function () {
            // Initialize race data
            $this->initializeRaceData();

            // Send initial data
            echo "data: " . json_encode($this->raceData) . "\n\n";
            ob_flush();
            flush();

            // Update and send race data every 5 seconds
            while (true) {
                $this->updateRaceData();
                
                echo "data: " . json_encode($this->raceData) . "\n\n";
                ob_flush();
                flush();

                // Check if the race has ended
                if ($this->raceData['raceInfo']['status'] === 'Finished') {
                    Log::info("Race has ended");
                    Log::info("Client disconnected");
                    break;
                }

                sleep(5);
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'Connection' => 'keep-alive'
        ]);
    }

    private $raceData = [
        'raceInfo' => [
            'name' => "Monaco Grand Prix",
            'currentLap' => 0,
            'totalLaps' => 4,
            'elapsedTime' => "00:00:00",
            'status' => "In Progress"
        ],
        'leaderboard' => []
    ];

    private $raceStartTime;

    public function __construct()
    {
        $this->raceStartTime = now();
    }

    private function initializeRaceData()
    {
        $leaderboardData = [
            ['driverId' => 1, 'position' => 1],
            ['driverId' => 2, 'position' => 2],
            ['driverId' => 3, 'position' => 3],
            ['driverId' => 4, 'position' => 4],
            ['driverId' => 5, 'position' => 5],
            ['driverId' => 6, 'position' => 6],
            ['driverId' => 7, 'position' => 7],
            ['driverId' => 8, 'position' => 8],
            ['driverId' => 9, 'position' => 9],
            ['driverId' => 10, 'position' => 10],
        ];

        $this->raceData['leaderboard'] = collect($leaderboardData)->map(function ($entry) {
            $driver = Driver::find($entry['driverId']);
            $team = Team::find($driver->team_id);
            return [
                'driverId' => $entry['driverId'],
                'position' => $entry['position'],
                'driverName' => $driver->driver_name,
                'team' => $team->team_name,
                'finishTime' => null
            ];
        })->toArray();

        $elapsedMilliseconds = now()->diffInMilliseconds($this->raceStartTime);
        $this->raceData['raceInfo']['elapsedTime'] = $this->formatElapsedTime($elapsedMilliseconds);

        return $this->raceData;
    }

    private function updateRaceData()
    {
        $updatedPositions = $this->fetchUpdatedPositions();

        foreach ($this->raceData['leaderboard'] as &$driver) {
            $updatedInfo = collect($updatedPositions)->firstWhere('driverId', $driver['driverId']);
            if ($updatedInfo) {
                $driver['position'] = $updatedInfo['position'];
            }
        }

        usort($this->raceData['leaderboard'], function ($a, $b) {
            return $a['position'] <=> $b['position'];
        });

        $this->raceData['raceInfo']['currentLap']++;

        $elapsedMilliseconds = now()->diffInMilliseconds($this->raceStartTime);
        $this->raceData['raceInfo']['elapsedTime'] = $this->formatElapsedTime($elapsedMilliseconds);

        if ($this->raceData['raceInfo']['currentLap'] > $this->raceData['raceInfo']['totalLaps']) {
            $this->raceData['raceInfo']['status'] = "Finished";
            $this->raceData['raceInfo']['currentLap'] = $this->raceData['raceInfo']['totalLaps'];

            foreach ($this->raceData['leaderboard'] as $index => &$driver) {
                $driver['finishTime'] = $this->formatElapsedTime($elapsedMilliseconds + $index * 2000);
            }
        }
    }

    private function fetchUpdatedPositions()
    {
        $leaderboardData = $this->raceData['leaderboard'];
        $driverCount = count($leaderboardData);

        $positions = range(1, $driverCount);
        shuffle($positions);

        foreach ($leaderboardData as $index => &$driver) {
            $driver['position'] = $positions[$index];
        }

        return $leaderboardData;
    }

    private function formatElapsedTime($milliseconds)
    {
        $seconds = floor($milliseconds / 1000);
        $hours = floor($seconds / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        $seconds = $seconds % 60;

        return sprintf('%02d:%02d:%02d', $hours, $minutes % 60, $seconds % 60);
    }

}
