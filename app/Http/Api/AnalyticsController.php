<?php

namespace App\Http\Api;

use App\Models\Course;
use App\Models\CourseStudent;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;


class AnalyticsController
{

    /**
     * @OA\Get(
     *     path="/api/admin/analytics/totales",
     *     tags={"Analytics"},
     *     summary="Get total number of courses and students",
     *     operationId="getTotales",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Total number of courses and students",
     *         @OA\JsonContent(
     *             @OA\Property(property="total_courses", type="integer", example=10),
     *             @OA\Property(property="total_students", type="integer", example=100)
     *         )
     *     )
     * )
     */
    public function totales()
    {

        $totalCourses = Course::count();
        $totalStudents = Student::count();
        return new JsonResponse(
            [
                'total_courses' => $totalCourses,
                'total_students' => $totalStudents
            ]
            , 200);
    }


    /**
     * @OA\Get(
     *     path="/api/admin/analytics/students-top",
     *     tags={"Analytics"},
     *     summary="Get top students by number of courses",
     *     operationId="getTopStudents",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Top students by number of courses",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="John Doe"),
     *                 @OA\Property(property="courses_count", type="integer", example=5)
     *             )
     *         )
     *     )
     * )
     */
    public function studentsTop()
    {
        $courseStudents = CourseStudent::groupBy('course_students.student_id')
            ->selectRaw('count(course_students.student_id) as courses_count, course_students.student_id')
            ->join('courses', 'courses.id', '=', 'course_students.course_id')
            ->join('students', 'students.id', '=', 'course_students.student_id')
            ->where('course_students.created_at', '>=', now()->subMonths(6))
            ->whereNull('students.deleted_at')
            ->whereNull('courses.deleted_at')
            ->whereNull('course_students.deleted_at')
            ->orderBy('courses_count', 'desc')
            ->limit(3)
            ->get();

        $students = Student::whereIn('id', $courseStudents->pluck('student_id'))->get();

        return array_map(function ($student) use ($courseStudents) {
            $student['courses_count'] = $courseStudents->where('student_id', '=', $student['id'])->first()->courses_count;
            return [
                'id' => $student['id'],
                'name' => $student['name'],
                'courses_count' => $student['courses_count']

            ];
        }, $students->toArray());
    }


    /**
     * @OA\Get(
     *     path="/api/admin/analytics/courses-top",
     *     tags={"Analytics"},
     *     summary="Get top courses by number of students enrolled in the last 6 months",
     *     operationId="getTopCourses",
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Top courses by number of students",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="Course Name"),
     *                 @OA\Property(property="students_count", type="integer", example=20)
     *             )
     *         )
     *     )
     * )
     */
    public function coursesTop(Request $request)
    {
        $courseStudents = CourseStudent::groupBy('course_students.course_id')
            ->selectRaw('count(course_students.course_id) as students_count, course_students.course_id')
            ->join('courses', 'courses.id', '=', 'course_students.course_id')
            ->join('students', 'students.id', '=', 'course_students.student_id')
            ->where('course_students.created_at', '>=', now()->subMonths(6))
            ->whereNull('students.deleted_at')
            ->whereNull('courses.deleted_at')
            ->whereNull('course_students.deleted_at')
            ->orderBy('students_count', 'desc')
            ->limit(3)
            ->get();

        $courses = Course::whereIn('id', $courseStudents->pluck('course_id'))->get();

        return array_map(function ($course) use ($courseStudents) {
            $course['students_count'] = $courseStudents->where('course_id', '=', $course['id'])->first()->students_count;
            return [
                'id' => $course['id'],
                'name' => $course['name'],
                'students_count' => $course['students_count']

            ];
        }, $courses->toArray());

    }
}
