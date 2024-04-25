<?php

namespace App\Http\Api;

use App\Models\Course;
use App\Models\CourseStudent;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnalyticsController
{
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

    public function studentsTop()
    {
        $courseStudents = CourseStudent::groupBy('course_students.student_id')
            ->selectRaw('count(course_students.student_id) as courses_count, course_students.student_id')
            ->join('courses', 'courses.id', '=', 'course_students.course_id')
            ->join('students', 'students.id', '=', 'course_students.student_id')
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
