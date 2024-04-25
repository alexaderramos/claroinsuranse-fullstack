<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CourseStudent extends Model
{
    use SoftDeletes;

    protected $table = 'course_students';

    protected $fillable = [
        'course_id',
        'student_id',
    ];

    public $timestamps = true;

    public function setCreatedAtAttribute($value)
    {
        $this->attributes['created_at'] = now()->format('Y-m-d H:i:s');
    }


    public function course(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function student(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
