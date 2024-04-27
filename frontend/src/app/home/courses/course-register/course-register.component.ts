import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../core/course.service";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CourseTypeModel} from "../../../shared/models/course-type.model";
import {CustomInputComponent} from "../../../shared/components/custom-input/custom-input.component";
import {NgClass, NgForOf} from "@angular/common";
import {CourseModel} from "../../../shared/models/course.model";
import {AlertService} from "../../../shared/services/alert.service";

@Component({
  selector: 'app-course-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CustomInputComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './course-register.component.html',
  styleUrl: './course-register.component.scss'
})
export class CourseRegisterComponent implements OnInit {


  courseId: string = '';
  editMode: boolean = false;
  title: string = '';
  types: CourseTypeModel[] = [];

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
    course_type_id: new FormControl('', [Validators.required]),
  });

  constructor(
    private courseService: CourseService,
    private loadingService: LoadingBarService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {

    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.courseId = params['id'];
        this.editMode = this.router.url.includes('edit') && this.courseId.length > 0;
        this.title = 'Edita el curso';
      } else {
        this.title = 'Registra un nuevo curso';
      }

    });

  }

  ngOnInit() {
    if (this.editMode) {
      this.loadingService.start();
      this.courseService.find(Number(this.courseId))
        .subscribe((course) => {
          this.form.patchValue(course);
        }, error => {
          console.error(error);
        }, () => {
          this.loadingService.complete();
        });
    }

    this.courseService.getTypes().subscribe((types)=>{
      this.types = types;
    })
  }

  saveCourse() {

    const course = this.form.getRawValue() as CourseModel;
    const service = this.editMode ? this.courseService.update(course, Number(this.courseId)) : this.courseService.create(course);
    this.loadingService.start();
    service.subscribe((course) => {
      this.alertService.success('Curso guardado correctamente');
    }, error => {
      this.alertService.error(error.error.message);
      this.loadingService.stop();
    }, () => {
      this.loadingService.complete();
    });

  }
}
