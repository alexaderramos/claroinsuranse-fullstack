import {Component, OnInit} from '@angular/core';
import {CourseModel} from "../../shared/models/course.model";
import {CourseService} from "../../core/course.service";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {Router} from "@angular/router";
import {
  NgbDropdown,
  NgbDropdownAnchor,
  NgbDropdownButtonItem,
  NgbDropdownItem, NgbDropdownMenu,
  NgbModal, NgbPagination
} from "@ng-bootstrap/ng-bootstrap";
import {
  ModalConfirmationComponent
} from "../../shared/components/modals/modal-confirmation/modal-confirmation.component";
import {StudentService} from "../../core/student.service";
import {StudentModel} from "../../shared/models/student.model";
import {DatePipe, SlicePipe} from "@angular/common";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    DatePipe,
    NgbDropdown,
    NgbDropdownAnchor,
    NgbDropdownButtonItem,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbPagination,
    SlicePipe
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit{
  students: StudentModel [] = []
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private studentsService: StudentService,
    private loadingService: LoadingBarService,
    private router: Router,
    private modalService: NgbModal,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.loadingService.start();
    this.studentsService.all().subscribe(
      (students) => {
        this.students = students;
      },
      error => {
      },
      () => {
        this.loadingService.complete()
      }
    );
  }

  goToDetails(student: StudentModel) {
    this.router.navigate(['/students', student.id]);
  }

  goToUpdate(student: StudentModel) {
    this.router.navigate(['/students', student.id, 'edit']);
  }

  confirmDelete(student: StudentModel) {
    const modalRef = this.modalService.open(ModalConfirmationComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    modalRef.closed.subscribe((result) => {
      if (result){
        this.loadingService.start()
        this.studentsService.delete(Number(student.id)).subscribe(
          (result) => {
            this.students = this.students.filter(s => s.id !== student.id);
            this.alertService.success('Estudiante eliminado correctamente')

          },
          error => {
            if (error.error.message) {
              this.alertService.error(error.error.message)
            }
          },
          () => {
            this.loadingService.complete()
          }
        )
      }
    })
    modalRef.componentInstance.message = 'Confirmar elimar al estudiante '+student.name;
  }

  goToCreate() {
    this.router.navigateByUrl('/students/register');
  }
}
