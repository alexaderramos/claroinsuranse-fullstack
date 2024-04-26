export interface AnalyticsTotalInterface {
  total_courses: number;
  total_students: number;
}


export interface BaseTopInterface {
  id: number;
  name: string;

}

export interface AnalyticsStudentsTopInterface extends BaseTopInterface {
  total_courses: number;
}


export interface AnalyticsCoursesTopInterface extends BaseTopInterface {
  total_students: number;
}
