<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EventSchedule>
 */
class EventScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $eventNames = ['Australian Grand Prix', 'Austrian Grand Prix', 'Belgian Grand Prix', 'British Grand Prix', 'Canadian Grand Prix', 'French Grand Prix', 'Hungarian Grand Prix', 'Italian Grand Prix', 'Singapore Airlines Singapore Grand Prix', 'United States Grand Prix', 'Mexican Grand Prix', 'Brazilian Grand Prix', 'United States Grand Prix', 'Japanese Grand Prix', 'Mexican Grand Prix', 'Saudi Arabian Grand Prix', 'Abu Dhabi Grand Prix'];
        $circuitNames = ['Melbourne Grand Prix Circuit', 'Red Bull Ring', 'Spa-Francorchamps', 'Silverstone Circuit', 'Circuit Gilles Villeneuve', 'Circuit Paul Ricard', 'Hungaroring', 'Autodromo Nazionale Monza', 'Marina Bay Street Circuit', 'Circuit of the Americas', 'Autódromo Hermanos Rodríguez', 'Autódromo José Carlos Pace', 'Suzuka Circuit', 'Autódromo Hermanos Rodríguez', 'Jeddah Corniche Circuit', 'Yas Marina Circuit'];
        $locations = ['Melbourne', 'Spielberg', 'Stavelot', 'Silverstone', 'Montreal', 'Le Castellet', 'Mogyoród', 'Monza', 'Singapore', 'Austin', 'Mexico City', 'São Paulo', 'Austin', 'Suzuka', 'Mexico City', 'Jeddah', 'Abu Dhabi'];
        $countries = ['Australia', 'Austria', 'Belgium', 'United Kingdom', 'Canada', 'France', 'Hungary', 'Italy', 'Singapore', 'United States', 'Mexico', 'Brazil', 'United States', 'Japan', 'Mexico', 'Saudi Arabia', 'United Arab Emirates'];

        $dates = [ '2024-07-07', '2024-07-21', '2024-08-24', '2024-09-01', '2024-09-08', '2024-09-22', '2024-10-06', '2024-10-20', '2024-11-03', '2024-11-23', '2024-12-01' ];

        return [
            'event_name' => fake()->randomElement($eventNames),
            'event_date' => fake()->randomElement($dates),
            'circuit_name' => fake()->randomElement($circuitNames),
            'location' => fake()->randomElement($locations),
            'country' => fake()->randomElement($countries),
        ];
    }
}
