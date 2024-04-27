<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OpenApi\Annotations as OA;


/**
 * Class Course
 *
 * @package App\Models
 * @OA\Schema(
 *     title="Course",
 *     description="Course model",
 *     required={"name", "start_date", "end_date", "course_type_id"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="Course ID",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="Course name",
 *         example="Mathematics"
 *     ),
 *     @OA\Property(
 *         property="start_date",
 *         type="string",
 *         format="date",
 *         description="Course start date",
 *         example="2024-05-01"
 *     ),
 *     @OA\Property(
 *         property="end_date",
 *         type="string",
 *         format="date",
 *         description="Course end date",
 *         example="2024-07-01"
 *     ),
 *     @OA\Property(
 *         property="course_type_id",
 *         type="integer",
 *         description="ID of the course type",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="type",
 *         ref="#/components/schemas/CourseType"
 *     )
 * )
 */
class Course extends Model
{

    use SoftDeletes;
    use HasFactory;

    protected $with = ['type'];

    protected $table = "courses";

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'course_type_id'
    ];

    public function type()
    {
        return $this->belongsTo(CourseType::class,'course_type_id');
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'course_students')
            ->whereNull('course_students.deleted_at')
            ->withPivot(['id', 'student_id', 'course_id', 'created_at']);
    }
}
