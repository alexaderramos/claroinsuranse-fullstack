import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CourseTypeModel} from "../../../shared/models/course-type.model";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CourseService} from "../../../core/course.service";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {NgbAlert, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../shared/services/alert.service";
import {CourseModel} from "../../../shared/models/course.model";
import {StudentService} from "../../../core/student.service";
import {StudentFormModel} from "../../../shared/models/student.model";
import {CustomInputComponent} from "../../../shared/components/custom-input/custom-input.component";
import {NgForOf, NgIf} from "@angular/common";
import {mapError} from "../../../shared/mappers/errors.mapper";
import {ShowErrorsComponent} from "../../../shared/components/show-errors/show-errors.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [
    CustomInputComponent,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    NgbAlert,
    ShowErrorsComponent
  ],
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.scss'
})
export class StudentRegisterComponent implements OnInit {

  studentId: string = '';
  editMode: boolean = false;
  title: string = '';
  errors: HttpErrorResponse| undefined


  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    last_name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    identification: new FormControl('', [Validators.required, Validators.maxLength(11)]),
    age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(100)]),
  });

  constructor(
    private studentService: StudentService,
    private loadingService: LoadingBarService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
  ) {

    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.studentId = params['id'];
        this.editMode = this.router.url.includes('edit') && this.studentId.length > 0;
        this.title = 'Editar estudiante';
      } else {
        this.title = 'Registrar estudiante';
      }

    });

  }

  ngOnInit() {
    if (this.editMode) {
      this.loadingService.start();
      this.studentService.find(Number(this.studentId))
        .subscribe((student) => {
          this.form.patchValue(student);
        }, error => {
          console.error(error);
        }, () => {
          this.loadingService.complete();
        });
    }
  }

  saveStudent() {

    const student = this.form.getRawValue() as StudentFormModel;
    const service = this.editMode ? this.studentService.update(student, Number(this.studentId)) : this.studentService.create(student);
    this.loadingService.start();
    service.subscribe((student) => {
      this.alertService.success('Estudiante guardado correctamente');
      if (!this.editMode) {
        this.form.reset();
      }
    }, error => {
      this.errors = error;
      this.form.setErrors(error.error.errors);
      this.alertService.error(error.error.message);
      this.loadingService.stop();
    }, () => {
      this.errors = undefined;
      this.loadingService.complete();
    });

  }
}
