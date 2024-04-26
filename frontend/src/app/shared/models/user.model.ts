export class UserModel {
  constructor(
    public name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public password_confirmation?: string,
    public id?: number,
  ) {
  }
}
