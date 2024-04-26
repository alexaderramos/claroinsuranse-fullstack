<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\CourseType;
use App\Models\Student;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // first we seed the tables that have no foreign keys
        $this->call([
            UserTableSeeder::class,
            CourseTypeTableSeeder::class,
        ]);


        User::factory(10)->create();
        Student::factory(10)->create();
        Course::factory(10)->create();


    }
}
