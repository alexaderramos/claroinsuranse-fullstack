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
  NgbDropdownModule, NgbPagination
} from "@ng-bootstrap/ng-bootstrap";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {Router} from "@angular/router";

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

  }

  confirmDelete(course: CourseModel) {

  }

  goToCreate() {

  }
}
