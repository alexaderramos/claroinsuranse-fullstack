<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CourseUpdateTest extends TestCase
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

    public function testUpdateCourse()
    {
        $this->authenticate();

        $course = Course::factory()->create();

        $updatedCourseData = [
            'name' => 'Curso Actualizado',
            'start_date' => '2024-05-01',
            'end_date' => '2024-06-01',
            'course_type_id' => 1,
        ];

        $response = $this->putJson("/api/admin/courses/{$course->id}", $updatedCourseData);

        $response->assertStatus(200);

        $this->assertDatabaseHas('courses', $updatedCourseData);
    }

    public function testUpdateCourseWithInvalidData()
    {
        $this->authenticate();

        $course = Course::factory()->create();

        $invalidUpdatedCourseData = [
            'start_date' => '2024-05-01',
            'end_date' => '2024-06-01',
            'course_type_id' => 1,
        ];

        $response = $this->putJson("/api/admin/courses/{$course->id}", $invalidUpdatedCourseData);

        $response->assertStatus(422);

        $response->assertJsonValidationErrors(['name']);
    }

    public function testUpdateNonExistentCourse()
    {
        $this->authenticate();


        $nonExistentCourseId = 999;

        $response = $this->putJson("/api/admin/courses/{$nonExistentCourseId}", [
            'name' => 'Curso Actualizado',
            'start_date' => '2024-05-01',
            'end_date' => '2024-06-01',
            'course_type_id' => 1,
        ]);

        // Asegurar que la solicitud devuelva un error 404
        $response->assertStatus(404);
    }
}
