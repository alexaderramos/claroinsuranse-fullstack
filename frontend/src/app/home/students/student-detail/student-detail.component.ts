import { Component } from '@angular/core';
import {CourseModel} from "../../../shared/models/course.model";
import {StudentModel} from "../../../shared/models/student.model";
import {CourseService} from "../../../core/course.service";
import {ActivatedRoute} from "@angular/router";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {catchError, finalize, of, switchMap, tap} from "rxjs";
import {
  ModalConfirmationComponent
} from "../../../shared/components/modals/modal-confirmation/modal-confirmation.component";
import {StudentService} from "../../../core/student.service";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [
    DatePipe,
    NgIf
  ],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {
  studentId: string = '';
  student: StudentModel | undefined;
  courses: CourseModel[] = [];

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingBarService,
    private modalService: NgbModal,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.studentId = params['id'];
    });
  }

  ngOnInit(): void {
    this.loadingService.start();
    this.studentService.find(Number(this.studentId))
      .pipe(
        tap((student) => {
          this.student = student;
        }),
        switchMap((course) => {
          return this.studentService.getCourses(Number(course.id))
            .pipe(
              tap((courses) => {
                this.courses = courses;
              }),
              catchError((error) => {
                console.error(error);
                return of([]);
              })
            );
        }),
        catchError((error) => {
          console.error(error);
          return of([]);
        }),
        finalize(() => {
          this.loadingService.complete();
        })
      ).subscribe()
  }

  openConfirmation(course: CourseModel) {
    const modalRef = this.modalService.open(ModalConfirmationComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    })
    modalRef.componentInstance.message = `¿Estás seguro de quitar el curso "${course.name}" de este alumno?`;

    modalRef.closed.subscribe((result: boolean) => {
      if (result) {
        this.studentService.unsubscribeStudent({student_id: Number(this.studentId), course_id: Number(course.id)})
          .subscribe(() => {
            this.courses = this.courses.filter(s => s.id !== course.id);
          })
      }
    })

  }
}
