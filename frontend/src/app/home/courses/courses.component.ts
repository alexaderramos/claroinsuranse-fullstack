import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../core/course.service";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {CourseModel} from "../../shared/models/course.model";
import {DatePipe, SlicePipe} from "@angular/common";
import {ionMenuOutline, ionCreateOutline} from "@ng-icons/ionicons";
import {
  NgbDropdown,
  NgbDropdownAnchor,
  NgbDropdownButtonItem,
  NgbDropdownMenu,
  NgbDropdownModule, NgbModal, NgbPagination
} from "@ng-bootstrap/ng-bootstrap";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {Router} from "@angular/router";
import {
  ModalConfirmationComponent
} from "../../shared/components/modals/modal-confirmation/modal-confirmation.component";

@Component({
  selector: 'app-courses',
  standalone: true,
  providers: [provideIcons({ionMenuOutline, ionCreateOutline})],
  imports: [
    DatePipe,
    NgbDropdownAnchor,
    NgbDropdownMenu,
    NgbDropdownButtonItem,
    NgbDropdown,
    NgbDropdownModule,
    NgIcon,
    NgbPagination,
    SlicePipe
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  courses: CourseModel [] = []
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private courseService: CourseService,
    private loadingService: LoadingBarService,
    private router: Router,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.loadingService.start();
    this.courseService.all().subscribe(
      (courses) => {
        this.courses = courses;
      },
      error => {
      },
      () => {
        this.loadingService.complete()
      }
    );
  }

  goToDetails(course: CourseModel) {
    this.router.navigate(['/courses', course.id]);
  }

  goToUpdate(course: CourseModel) {
    this.router.navigate(['/courses', course.id, 'edit']);
  }

  confirmDelete(course: CourseModel) {
    const modalRef = this.modalService.open(ModalConfirmationComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
    });
    modalRef.closed.subscribe((result) => {
      if (result){
        this.courseService.delete(Number(course.id)).subscribe(
          () => {
            this.courses = this.courses.filter(c => c.id !== course.id);
          },
          error => {
          }
        )
      }
    })
    modalRef.componentInstance.message = 'Confirmar elimar el curso '+course.name;
  }

  goToCreate() {
    this.router.navigateByUrl('/courses/register');
  }
}
