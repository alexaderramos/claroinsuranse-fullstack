<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OpenApi\Annotations as OA;


/**
 * Class CourseType
 *
 * @package App\Models
 * @OA\Schema(
 *     title="CourseType",
 *     description="CourseType model",
 *     required={"name"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="Course type ID",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="Course type name",
 *         example="Online"
 *     )
 * )
 */
class CourseType extends Model
{
    use SoftDeletes;

    protected $fillable = ['name'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
