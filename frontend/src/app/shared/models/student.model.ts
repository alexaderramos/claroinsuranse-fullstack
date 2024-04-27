import {StudentCoursePivot} from "../interfaces/student-course-pivot";

export class StudentModel{
   constructor(

      public name: string,
      public last_name: string,
      public email: string,
      public identification: string,
      public id: number,
      public age: number,
      public pivot?: StudentCoursePivot,
   ) {
   }
}

export class StudentFormModel{
  constructor(
    public name: string,
    public last_name: string,
    public email: string,
    public identification: string,
    public age: number,
  ) {
  }
}


