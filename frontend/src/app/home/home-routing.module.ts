import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "../core/auth/guards/auth.guard";
import {MainComponent} from "./main/main.component";
import {CoursesComponent} from "./courses/courses.component";
import {CourseRegisterComponent} from "./courses/course-register/course-register.component";
import {CourseDetailComponent} from "./courses/course-detail/course-detail.component";
import {StudentsComponent} from "./students/students.component";
import {StudentRegisterComponent} from "./students/student-register/student-register.component";

const routes: Routes = [
  {
    path: '',
    canMatch: [AuthGuard],
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: DashboardComponent
      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            component: CoursesComponent
          },
          {
            path: 'register',
            component: CourseRegisterComponent
          },
          {
            path: ':id',
            component: CourseDetailComponent
          },
          {
            path: ':id/edit',
            component: CourseRegisterComponent
          },
        ]
      },
      {
        path: 'students',
        children: [
          {
            path: '',
            component: StudentsComponent
          },
          {
            path: 'register',
            component: StudentRegisterComponent
          },
          {
            path: ':id',
            component: CourseDetailComponent
          },
          {
            path: ':id/edit',
            component: StudentRegisterComponent
          },
        ]
      },


      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
