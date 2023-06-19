import { Role } from '../users.type';

export const roles = ['user', 'admin'];

class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;

  constructor(id: number, firstName: string, lastName: string, email: string, role: Role) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
  }
}

export default User;
