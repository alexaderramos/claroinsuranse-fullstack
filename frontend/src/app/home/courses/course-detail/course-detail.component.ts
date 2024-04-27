import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../core/course.service";
import {ActivatedRoute} from "@angular/router";
import {CourseModel} from "../../../shared/models/course.model";
import {catchError, finalize, from, of, switchMap, tap} from "rxjs";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {DatePipe} from "@angular/common";
import {StudentModel} from "../../../shared/models/student.model";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {ionCreateOutline, ionMenuOutline, ionRemove} from "@ng-icons/ionicons";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  ModalConfirmationComponent
} from "../../../shared/components/modals/modal-confirmation/modal-confirmation.component";

@Component({
  selector: 'app-course-detail',
  standalone: true,
  providers: [provideIcons({ionMenuOutline, ionCreateOutline, ionRemove})],
  imports: [
    DatePipe,
    NgIcon,
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {

  courseId: string = '';
  course: CourseModel | undefined;
  students: StudentModel[] = [];

  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingBarService,
    private modalService: NgbModal,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.courseId = params['id'];
    });
  }

  ngOnInit(): void {
    this.loadingService.start();
    this.courseService.find(Number(this.courseId))
      .pipe(
        tap((course) => {
          this.course = course;
        }),
        switchMap((course) => {
          return this.courseService.getStudents(Number(course.id))
            .pipe(
              tap((students) => {
                this.students = students;
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

  openConfirmation(student: StudentModel) {
    const modalRef = this.modalService.open(ModalConfirmationComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    })
    modalRef.componentInstance.message = `¿Estás seguro de quitar al estudiante ${student.name} de este curso?`;

    modalRef.closed.subscribe((result: boolean) => {
      if (result) {
        this.courseService.unsubscribeStudent({course_id: Number(this.courseId), student_id: student.id})
          .subscribe(() => {
            this.students = this.students.filter(s => s.id !== student.id);
          })
      }
    })

  }
}
