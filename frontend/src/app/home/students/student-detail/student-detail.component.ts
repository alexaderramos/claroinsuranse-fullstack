import {Component, OnInit} from '@angular/core';
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
import {
  ModalEnrollCourseComponent
} from "../../../shared/components/modals/modal-enroll-course/modal-enroll-course.component";
import {AlertService} from "../../../shared/services/alert.service";

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
export class StudentDetailComponent implements OnInit {
  studentId: string = '';
  student: StudentModel | undefined;
  courses: CourseModel[] = [];
  availableCourses: CourseModel[] = [];

  constructor(
    private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingBarService,
    private modalService: NgbModal,
    private alertService: AlertService
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

  openModal() {
    const modalRef = this.modalService.open(ModalEnrollCourseComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    modalRef.closed.subscribe((courseId: number) => {
      console.log(courseId);
    })

    modalRef.componentInstance.sendForm.subscribe((course: CourseModel) => {
      this.loadingService.start()
      this.studentService.enroll(Number(this.studentId), Number(course.id))
        .subscribe((response) => {
            this.alertService.success(response.message);


          }, (error) => {
            modalRef.componentInstance.errors = error;
            this.loadingService.stop();
          },
          () => {
            modalRef.componentInstance.errors = undefined;
            modalRef.close();
            this.loadingService.complete();
            this.studentService.getCourses(Number(this.studentId)).subscribe((courses) => {
              this.courses = courses;
            });
          })
    })

  }
}
