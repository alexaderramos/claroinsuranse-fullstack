import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {CourseFormModel, CourseModel} from "../shared/models/course.model";
import {API_URL} from "../shared/constants/route.constants";
import {StudentFormModel, StudentModel} from "../shared/models/student.model";
import {CourseTypeModel} from "../shared/models/course-type.model";


@Injectable()
export class StudentService {

  constructor(
    private http: HttpClient
  ) {
  }

  all(): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(`${API_URL}/admin/students`);
  }

  find(id: number): Observable<StudentModel> {
    return this.http.get<StudentModel>(`${API_URL}/admin/students/${id}`);
  }

  create(course: StudentFormModel): Observable<StudentModel> {
    return this.http.post<StudentModel>(`${API_URL}/admin/students`, course);
  }

  update(course: StudentFormModel, id: number): Observable<StudentModel> {
    return this.http.put<StudentModel>(`${API_URL}/admin/students/${id}`, course);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/admin/students/${id}`);
  }

  getCourses(id: number): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(`${API_URL}/admin/students/${id}/courses`);
  }

  unsubscribeStudent(body: { course_id: number, student_id: number }): Observable<any> {
    return this.http.post(`${API_URL}/admin/students/unsubscribe`, {...body});
  }

  enroll(student_id:number, course_id:number): Observable<any> {
    return this.http.post<any>(`${API_URL}/admin/students/${student_id}/enroll`,{
      course_id
    });
  }
}
