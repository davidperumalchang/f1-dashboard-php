<?php

namespace Database\Seeders;

use App\Models\EventSchedule;
use App\Models\Team;
use App\Models\Driver;
use App\Models\UserAdmin;

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
        UserAdmin::factory(1)->create();
    }
}
