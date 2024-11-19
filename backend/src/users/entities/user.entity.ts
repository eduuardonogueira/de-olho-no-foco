export class UserEntity {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  role: 'adventure' | 'organization' | 'admin';
}
