import { Book } from './Book';
import { User } from './User';

export interface Club {
  _id: number;
  name: string;
  description: string;
  books?: Array<Book>;
  users?: Array<User>;
}
