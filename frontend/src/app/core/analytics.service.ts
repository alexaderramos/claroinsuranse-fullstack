import {Injectable} from '@angular/core';
import {API_URL} from "../shared/constants/route.constants";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth/auth.service";
import {Observable} from "rxjs";
import {
  AnalyticsCoursesTopInterface,
  AnalyticsStudentsTopInterface,
  AnalyticsTotalInterface
} from "../shared/interfaces/analytics.interface";

@Injectable()
export class AnalyticsService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getTotales(): Observable<AnalyticsTotalInterface> {
    return this.http.get<AnalyticsTotalInterface>(`${API_URL}/admin/analytics/totales`);
  }

  getTopStudents(): Observable<AnalyticsStudentsTopInterface[]> {
    return this.http.get<AnalyticsStudentsTopInterface[]>(`${API_URL}/admin/analytics/students-top`);
  }

  getTopCourses(): Observable<AnalyticsCoursesTopInterface[]> {
    return this.http.get<AnalyticsCoursesTopInterface[]>(`${API_URL}/admin/analytics/courses-top`);
  }

}
