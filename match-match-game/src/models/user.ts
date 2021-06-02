export class User {
  firstname?: string;

  lastname?: string;

  email?: string;

  score?: number;

  id?: number;

  constructor(firstname: string, lastname: string, email: string) {
    this.firstname = firstname,
    this.lastname = lastname,
    this.email = email;
  }
}
