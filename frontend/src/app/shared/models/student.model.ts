export class StudentModel{
   constructor(

      public name: string,
      public last_name: string,
      public email: string,
      public identification: string,
      public id: number,
      public age: number,
      public pivot?: StudentCoursePivotInterface,
   ) {
   }
}


export interface StudentCoursePivotInterface {
  course_id: number;
  student_id: number;
  created_at: string;
}
