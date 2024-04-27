<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Student",
 *     title="Student",
 *     description="Student model",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         example="John"
 *     ),
 *     @OA\Property(
 *         property="last_name",
 *         type="string",
 *         example="Doe"
 *     ),
 *     @OA\Property(
 *         property="age",
 *         type="integer",
 *         example=25
 *     ),
 *     @OA\Property(
 *         property="identification",
 *         type="string",
 *         example="123456789"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         format="email",
 *         example="john@example.com"
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
class Student extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $table = 'students';

    protected $fillable = [
        'name',
        'last_name',
        'age',
        'identification',
        'email',
    ];

    public function courses(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_students', 'student_id', 'course_id')
            ->whereNull('course_students.deleted_at')
            ->withPivot(['id', 'student_id', 'course_id', 'created_at']);
    }
}
