export class User {
  firstname?: string;

  lastname?: string;

  email?: string;

  score?: number;

  id?: number;

  avatar?: string;

  constructor(firstname: string, lastname: string, email: string, avatar?: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.avatar = avatar;
    this.score = 0;
  }
}
