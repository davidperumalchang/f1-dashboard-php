<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Driver>
 */
class DriverFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $driverNames = ['Lewis Hamilton', 'Max Verstappen', 'Valtteri Bottas', 'Charles Leclerc', 'Carlos Sainz', 'Lando Norris', 'Daniel Ricciardo', 'Lance Stroll', 'Fernando Alonso', 'Esteban Ocon'];
        $teamIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        return [
            'driver_name' => fake()->randomElement($driverNames),
            'team_id' => fake()->randomElement($teamIds),
        ];
    }
}
