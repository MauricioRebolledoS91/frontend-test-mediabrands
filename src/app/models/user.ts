export class user {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;

  /**
   *
   */
  constructor(firstName: string, lastName: string, email: string, userName: string, id: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userName = userName;
    this.id = id;
  }
}
