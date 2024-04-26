import {CourseTypeModel} from "./course-type.model";

export class CourseModel {
  constructor(
    public name: string,
    public start_date: string,
    public end_date: string,
    public course_type_id: string,
    public type: CourseTypeModel,
    public id?: number,

  ) {
  }
}
