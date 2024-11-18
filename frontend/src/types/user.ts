export interface ICreateUser {
  firstName: string,
  lastName: string,
  phone: string
  email: string,
  password: string,
  role: IUserRole
}

export interface IUser extends ICreateUser{
  id: string,
  createdAt: Date,
  updatedAt: Date
}

export type IUserRole = 'adventure' | 'organization' | 'admin' 