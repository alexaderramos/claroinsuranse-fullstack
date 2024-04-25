<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Laravel 8',
                'course_type_id' => 1,
                'start_date' => '2024-04-25',
                'end_date' => '2024-05-25',
            ],
            [
                'name' => 'Laravel 9',
                'course_type_id' => 2,
                'start_date' => '2024-06-25',
                'end_date' => '2024-07-25',
            ],
        ];

        Course::insert($data);

    }
}
