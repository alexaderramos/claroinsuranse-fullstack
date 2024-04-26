import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../core/course.service";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {CourseModel} from "../../shared/models/course.model";
import {DatePipe} from "@angular/common";
import {ionMenuOutline} from "@ng-icons/ionicons";
import {
  NgbDropdown,
  NgbDropdownAnchor,
  NgbDropdownButtonItem,
  NgbDropdownMenu,
  NgbDropdownModule
} from "@ng-bootstrap/ng-bootstrap";
import {NgIcon} from "@ng-icons/core";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    DatePipe,
    NgbDropdownAnchor,
    NgbDropdownMenu,
    NgbDropdownButtonItem,
    NgbDropdown,
    NgbDropdownModule,
    NgIcon
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  courses: CourseModel [] = []

  constructor(
    private courseService: CourseService,
    private loadingService: LoadingBarService,
  ) {
  }

  ngOnInit() {
    this.loadingService.start();
    this.courseService.getCourses().subscribe(
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
}
