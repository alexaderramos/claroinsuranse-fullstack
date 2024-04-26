<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CourseCreateTest extends TestCase
{
    use DatabaseTransactions;

    protected function authenticate()
    {
        $user = User::factory()->create();

        $token = auth()->attempt([
            'email' => $user->email,
            'password' => 'password'
        ]);

        $this->withHeaders([
            'Authorization' => 'Bearer ' . $token
        ]);
    }

    public function testCreateCourse()
    {
        $this->authenticate();


        $courseData = [
            'name' => 'Curso de Ejemplo',
            'start_date' => '2024-05-01',
            'end_date' => '2024-06-01',
            'course_type_id' => 1,
        ];


        $response = $this->postJson('/api/admin/courses', $courseData);


        $response->assertStatus(201);


        $this->assertDatabaseHas('courses', $courseData);


        $response->assertJsonStructure([
            'id',
            'name',
            'start_date',
            'end_date',
            'course_type_id',
            'created_at',
            'updated_at',
        ]);
    }

    public function testCreateCourseWithInvalidData()
    {
        $this->authenticate();


        $invalidCourseData = [
            'start_date' => '2024-05-01',
            'end_date' => '2024-06-01',
            'course_type_id' => 1,
        ];

        $response = $this->postJson('/api/admin/courses', $invalidCourseData);

        $response->assertStatus(422);

        $response->assertJsonValidationErrors(['name']);
    }
}
