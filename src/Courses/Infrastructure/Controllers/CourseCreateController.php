<?php

namespace Src\Courses\Infrastructure\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


use Src\Courses\Application\UseCases\CourseCreateUseCase;

class CourseCreateController
{

    private CourseCreateUseCase $useCaseCreate;

    public function __construct(
        CourseCreateUseCase $useCaseCreate
    )
    {
        $this->useCaseCreate = $useCaseCreate;

    }

    public function __invoke(Request $request): \Illuminate\Http\JsonResponse
    {

//        $this->useCaseCreate->execute(assert($request instanceof CourseCreateUseCase);$request);
        return new JsonResponse([], 201);
    }

}
