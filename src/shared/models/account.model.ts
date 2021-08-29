export class Account {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  savedBreeds: string[];

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    savedBreeds: string[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.savedBreeds = savedBreeds;
  }
}
