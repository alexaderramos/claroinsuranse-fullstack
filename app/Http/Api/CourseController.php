<?php

namespace App\Http\Api;

use App\Http\Requests\Courses\CourseCreateRequest;
use App\Http\Requests\Courses\CourseUpdateRequest;
use App\Models\Course;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use OpenApi\Annotations as OA;


class CourseController
{
    /**
     * @OA\Get(
     *     path="/api/admin/courses",
     *     tags={"Courses"},
     *     summary="Get all courses",
     *     operationId="getCourses",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of courses",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Course")
     *         )
     *     )
     * )
     */
    public function index()
    {
        return Course::all();
    }


    /**
     * @OA\Post(
     *     path="/api/admin/courses",
     *     tags={"Courses"},
     *     summary="Create a new course",
     *     operationId="createCourse",
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Course data",
     *         @OA\JsonContent(ref="#/components/schemas/CourseCreateRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Course created successfully",
     *        @OA\JsonContent(ref="#/components/schemas/Course")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation errors",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid."),
     *             @OA\Property(property="errors", type="object", example={"name": {"The name field is required."}})
     *         )
     *     )
     * )
     */
    public function store(CourseCreateRequest $request)
    {
        DB::beginTransaction();
        try {
            $course = Course::create($request->validated());
            DB::commit();
            return new JsonResponse($course, 201);
        } catch (\Exception $exception) {
            DB::rollBack();
            return new JsonResponse([
                'message' => 'An error occurred'
            ], 500);
        }
    }

    /**
     * @OA\Put(
     *     path="/api/admin/courses/{id}",
     *     tags={"Courses"},
     *     summary="Update a course",
     *     operationId="updateCourse",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the course to update",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         description="Course data",
     *         @OA\JsonContent(ref="#/components/schemas/CourseUpdateRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Course updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Course")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Course not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation errors",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid."),
     *             @OA\Property(property="errors", type="object", example={"name": {"The name field is required."}})
     *         )
     *     )
     * )
     */
    public function update(CourseUpdateRequest $request, int $id)
    {
        DB::beginTransaction();
        try {
            $course = Course::findOrFail($id);
            $course->update($request->validated());
            DB::commit();
            return $course;
        } catch (ModelNotFoundException) {
            return new JsonResponse([
                'message' => 'Course not found'
            ], 404);
        } catch (\Exception $exception) {
            DB::rollBack();
            return new JsonResponse([
                'message' => 'An error occurred'
            ], 500);
        }

    }

    /**
     * @OA\Delete(
     *     path="/api/admin/courses/{id}",
     *     tags={"Courses"},
     *     summary="Delete a course",
     *     operationId="deleteCourse",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the course to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Course deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Course deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Course not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Course not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="An error occurred")
     *         )
     *     )
     * )
     */
    public function destroy(int $id)
    {
        DB::beginTransaction();
        try {
            $course = Course::findOrFail($id);
            $course = $course->delete();
            DB::commit();
            return new JsonResponse([
                'message' => 'Course deleted successfully'
            ], 200);
        } catch (ModelNotFoundException) {
            return new JsonResponse([
                'message' => 'Course not found'
            ], 404);
        } catch (\Exception) {
            DB::rollBack();
            return new JsonResponse([
                'message' => 'An error occurred'
            ], 500);
        }

    }

    /**
     * @OA\Get(
     *     path="/api/admin/courses/{id}",
     *     tags={"Courses"},
     *     summary="Get a specific course",
     *     operationId="getCourse",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the course to retrieve",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Course details",
     *         @OA\JsonContent(ref="#/components/schemas/Course")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Course not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Course not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="An error occurred")
     *         )
     *     )
     * )
     */
    public function show(int $id)
    {
        try {
            return Course::findOrFail($id);
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

    /**
     * @OA\Get(
     *     path="/api/admin/courses/{id}/students",
     *     tags={"Courses"},
     *     summary="Get students enrolled in a course",
     *     operationId="getCourseStudents",
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the course",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of students enrolled in the course",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Student")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Course not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Course not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal Server Error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="An error occurred")
     *         )
     *     )
     * )
     */
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
