export interface AnalyticsTotalInterface {
  total_courses: number;
  total_students: number;
}


export interface BaseTopInterface {
  id: number;
  name: string;

}

export interface AnalyticsStudentsTopInterface extends BaseTopInterface {
  courses_count: number;
}


export interface AnalyticsCoursesTopInterface extends BaseTopInterface {
  students_count: number;
}
