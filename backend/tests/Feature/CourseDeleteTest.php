<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CourseDeleteTest extends TestCase
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

    public function testDeleteCourse()
    {
        $this->authenticate();

        $course = Course::factory()->create();

        $response = $this->deleteJson("/api/admin/courses/{$course->id}");

        $response->assertStatus(200);

        $this->assertSoftDeleted('courses', [
            'id' => $course->id
        ]);
    }

    public function testDeleteNonExistentCourse()
    {
        $this->authenticate();

        $nonExistentCourseId = 999;

        $response = $this->deleteJson("/api/admin/courses/{$nonExistentCourseId}");

        $response->assertStatus(404);
    }
}
