<?php

namespace Database\Seeders;

use App\Models\EventSchedule;
use App\Models\Team;
use App\Models\Driver;
use App\Models\User;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        EventSchedule::factory(10)->create();
        Team::factory(10)->create();
        Driver::factory(10)->create();
        User::factory(1)->create();
    }
}
