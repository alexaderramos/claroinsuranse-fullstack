import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {CourseModel} from "../shared/models/course.model";
import {API_URL} from "../shared/constants/route.constants";


@Injectable()
export class CourseService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCourses(): Observable<CourseModel[]> {
    return this.http.get<CourseModel[]>(`${API_URL}/admin/courses`);
  }
}
