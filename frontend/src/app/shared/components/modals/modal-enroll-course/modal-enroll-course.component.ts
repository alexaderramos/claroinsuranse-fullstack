import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CourseService} from "../../../../core/course.service";
import {CourseModel} from "../../../models/course.model";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {StudentService} from "../../../../core/student.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ShowErrorsComponent} from "../../show-errors/show-errors.component";

@Component({
  selector: 'app-modal-enroll-course',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    DatePipe,
    ShowErrorsComponent
  ],
  templateUrl: './modal-enroll-course.component.html',
  styleUrl: './modal-enroll-course.component.scss'
})
export class ModalEnrollCourseComponent implements OnInit{


  courses: CourseModel[] = [];
  course: CourseModel | undefined;
  errors: HttpErrorResponse | undefined;
  @Output() sendForm = new EventEmitter<any>();

  form:FormGroup = new FormGroup({
    course_id: new FormControl('', Validators.required)
  });
  constructor(
    public activeModal: NgbActiveModal,
    private courseService: CourseService,
    private studentService: StudentService
  ) {
  }

  ngOnInit(): void {
      this.courseService.all().subscribe((courses) => {
        this.courses = courses;
      })
  }


  sendCourse() {

    const course_id = this.form.get('course_id')?.value;
    const course = this.courses.find((course) => course.id === course_id);


    this.sendForm.emit(course);
  }

  closeModal() {
    this.activeModal.close();

  }

  changeCourse(event: Event) {
    const course_id = this.form.get('course_id')?.value;
    this.course = this.courses.find((course) => course.id === course_id);
  }
}
