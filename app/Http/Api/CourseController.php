<?php

namespace App\Http\Api;

use App\Http\Requests\Courses\CourseCreateRequest;
use App\Http\Requests\Courses\CourseUpdateRequest;
use App\Models\Course;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;

class CourseController
{
    public function index()
    {
        return Course::all();
    }


    public function store(CourseCreateRequest $request)
    {
        $course = Course::create($request->validated());
        return new JsonResponse([], 201);
    }

    public function update(CourseUpdateRequest $request, int $id)
    {
        $course = Course::findOrFail($id);
        $course->update($request->validated());
        return $course;
    }

    public function destroy(int $id)
    {
        try {
            $course = Course::findOrFail($id);
            $course = $course->delete();
            return new JsonResponse([
                'message' => 'Course deleted successfully'
            ], 200);
        } catch (ModelNotFoundException) {
            return new JsonResponse([
                'message' => 'Course not found'
            ], 404);
        }

    }

    public function show(int $id)
    {
        try {
            $course = Course::findOrFail($id);
            return $course;
        } catch (ModelNotFoundException) {
            return new JsonResponse([
                'message' => 'Course not found'
            ], 404);
        } catch (\Exception) {
            return new JsonResponse([
                'message' => 'An error occurred'
            ], 500);
        }
    }

    public function students(int $id)
    {
        try {
            $course = Course::findOrFail($id);
            return $course->students;
        } catch (ModelNotFoundException) {
            return new JsonResponse([
                'message' => 'Course not found'
            ], 404);
        } catch (\Exception) {
            return new JsonResponse([
                'message' => 'An error occurred'
            ], 500);

        }

    }

}
