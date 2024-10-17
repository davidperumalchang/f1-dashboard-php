<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $teamNames = ['Red Bull Racing Honda RBPT', 'Mercedes', 'Ferrari', 'McLaren Renault', 'Renault', 'Alpine Renault', 'AlphaTauri Honda RBPT', 'Haas Ferrari', 'Williams Mercedes', 'Alfa Romeo Ferrari', 'Aston Martin Mercedes', 'BWT Mercedes', 'Mercedes AMG Petronas F1 Team'];
        $points = [300, 250, 200, 150, 100, 80, 70, 50, 30, 20, 15, 10, 5];
        $wins = [10, 8, 6, 5, 4, 3, 2, 1, 0, 1, 0, 0, 0];
        $podiums = [20, 15, 12, 10, 8, 6, 4, 2, 0, 3, 2, 1, 0];

        return [
            'team_name' => fake()->randomElement($teamNames),
            'points' => fake()->randomElement($points),
            'wins' => fake()->randomElement($wins),
            'podiums' => fake()->randomElement($podiums),
        ];
    }
}
