<?php

namespace App\Http\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Students\StudentCreateRequest;
use App\Http\Requests\Students\StudentEnrollMassiveRequest;
use App\Http\Requests\Students\StudentEnrollRequest;
use App\Http\Requests\Students\StudentUpdateRequest;
use App\Models\CourseStudent;
use App\Models\Student;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{

    public function index()
    {
        return Student::all();
    }


    public function store(StudentCreateRequest $request)
    {
        DB::beginTransaction();
        try {
            $student = Student::create($request->validated());
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error while creating student'], 500);
        }
    }


    public function show(string $id)
    {
        try {
            return Student::findOrFail($id);
        } catch (ModelNotFoundException $exception) {
            return new JsonResponse(['message' => 'Student not found'], 404);
        } catch (\Exception $exception) {
            return new JsonResponse(['message' => 'Error while fetching student'], 500);
        }
    }


    public function update(StudentUpdateRequest $request, int $id)
    {
        DB::beginTransaction();
        try {
            $student = Student::findOrFail($id);
            $student->update($request->validated());
            DB::commit();
            return new JsonResponse($student, 200);
        } catch (ModelNotFoundException) {
            return new JsonResponse(['message' => 'Student not found'], 404);
        } catch (\Exception) {
            DB::rollBack();
            return new JsonResponse(['message' => 'Error while updating student'], 500);
        }

    }

    public function destroy(string $id)
    {
        try {
            $student = Student::findOrFail($id);
            $student->delete();
            return new JsonResponse(['message' => 'Student deleted'], 200);
        } catch (ModelNotFoundException) {
            return new JsonResponse(['message' => 'Student not found'], 404);
        } catch (\Exception) {
            return new JsonResponse(['message' => 'Error while deleting student'], 500);
        }
    }

    public function courses(int $id)
    {
        try {
            $student = Student::findOrFail($id);
            return $student->courses->all();
        } catch (ModelNotFoundException) {
            return new JsonResponse(['message' => 'Student not found'], 404);

        } catch (\Exception) {
            return new JsonResponse(['message' => 'Error while fetching student courses'], 500);
        }
    }

    public function enrollMassive(StudentEnrollMassiveRequest $request, int $student)
    {

        try {
            $ids = $request->courses;
            $student = Student::findOrFail($student);
            $student->courses()->sync($ids);
            CourseStudent::where('student_id', $student->id)
                ->whereIn('course_id', $ids)->update(['created_at' => now()->format('Y-m-d H:i:s')]);
            return new JsonResponse(['message' => 'Student enrolled successfully'], 200);
        } catch (ModelNotFoundException) {
            return new JsonResponse(['message' => 'Student not found'], 404);
        } catch (\Exception) {
            return new JsonResponse(['message' => 'Error while enrolling student'], 500);
        }
    }

    public function enroll(StudentEnrollRequest $request, int $student)
    {

        try {
            $id = $request->course_id;
            $student = Student::findOrFail($student);
            CourseStudent::create([
                'student_id' => $student->id,
                'course_id' => $id,
            ]);
            return new JsonResponse(['message' => 'Student enrolled successfully'], 201);
        } catch (ModelNotFoundException) {
            return new JsonResponse(['message' => 'Student not found'], 404);
        } catch (\Exception) {
            return new JsonResponse(['message' => 'Error while enrolling student'], 500);
        }
    }
}
