<?php

namespace Src\Courses\Infrastructure\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


use Src\Courses\Application\UseCases\CourseCreateUseCase;
use Src\Courses\Application\UseCases\CourseUpdateUseCase;

class CourseUpdateController
{

    private CourseUpdateUseCase $useCaseUpdate;

    public function __construct(
        CourseUpdateUseCase $useCaseUpdate
    )
    {
        $this->useCaseUpdate = $useCaseUpdate;

    }

    public function __invoke(int $id,Request $request): \Illuminate\Http\JsonResponse
    {

        $this->useCaseUpdate->execute($id,$request);
        return new JsonResponse([], 201);
    }

}
