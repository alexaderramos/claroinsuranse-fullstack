<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model
{

    use SoftDeletes;

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
