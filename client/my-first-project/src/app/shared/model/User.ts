import { Club } from './Club';

export interface User {
  _id: number;
  email: string;
  name: string;
  address: string;
  nickname: string;
  password: string;
  clubs: Array<Club>;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
}
