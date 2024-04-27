import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {CourseFormModel, CourseModel} from "../shared/models/course.model";
import {API_URL} from "../shared/constants/route.constants";
import {StudentModel} from "../shared/models/student.model";
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

  create(course: CourseFormModel): Observable<StudentModel> {
    return this.http.post<StudentModel>(`${API_URL}/admin/students`, course);
  }

  update(course: CourseFormModel, id: number): Observable<StudentModel> {
    return this.http.put<StudentModel>(`${API_URL}/admin/students/${id}`, course);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/admin/students/${id}`);
  }

  getStudents(id: number): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(`${API_URL}/admin/students/${id}/students`);
  }

  unsubscribeStudent(body: { course_id: number, student_id: number }): Observable<any> {
    return this.http.post(`${API_URL}/admin/students/unsubscribe`, {...body});
  }

  getTypes(): Observable<CourseTypeModel[]> {
    return this.http.get<CourseTypeModel[]>(`${API_URL}/admin/students/types`);
  }
}
