<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OpenApi\Annotations as OA;


/**
 * @OA\Schema(
 *     schema="Course",
 *     title="Course",
 *     description="Course model",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         example="Course Name"
 *     ),
 *     @OA\Property(
 *         property="start_date",
 *         type="string",
 *         format="date",
 *         example="2024-04-25"
 *     ),
 *     @OA\Property(
 *         property="end_date",
 *         type="string",
 *         format="date",
 *         example="2024-05-25"
 *     ),
 *     @OA\Property(
 *         property="course_type_id",
 *         type="integer",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         type="string",
 *         format="date-time"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         type="string",
 *         format="date-time"
 *     ),
 *     @OA\Property(
 *         property="deleted_at",
 *         type="string",
 *         format="date-time",
 *         nullable=true
 *     )
 * )
 */
class Course extends Model
{

    use SoftDeletes;
    use HasFactory;

    protected $table = "courses";

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'course_type_id'
    ];

    public function type()
    {
        return $this->belongsTo(CourseType::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'course_students');
    }
}
