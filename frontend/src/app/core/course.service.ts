import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {CourseFormModel, CourseModel} from "../shared/models/course.model";
import {API_URL} from "../shared/constants/route.constants";
import {StudentModel} from "../shared/models/student.model";
import {CourseTypeModel} from "../shared/models/course-type.model";


@Injectable()
export class CourseService {

  constructor(
    private http: HttpClient
  ) {
  }

  all(): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(`${API_URL}/admin/courses`);
  }

  find(id: number): Observable<CourseModel> {
    return this.http.get<CourseModel>(`${API_URL}/admin/courses/${id}`);
  }

  create(course: CourseFormModel): Observable<CourseModel> {
    return this.http.post<CourseModel>(`${API_URL}/admin/courses`, course);
  }

  update(course: CourseFormModel, id: number): Observable<CourseModel> {
    return this.http.put<CourseModel>(`${API_URL}/admin/courses/${id}`, course);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/admin/courses/${id}`);
  }

  getStudents(id: number): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(`${API_URL}/admin/courses/${id}/students`);
  }

  unsubscribeStudent(body: { course_id: number, student_id: number }): Observable<any> {
    return this.http.post(`${API_URL}/admin/courses/unsubscribe`, {...body});
  }

  getTypes(): Observable<CourseTypeModel[]> {
    return this.http.get<CourseTypeModel[]>(`${API_URL}/admin/courses/types`);
  }
}
