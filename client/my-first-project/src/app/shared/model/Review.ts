import { Book } from './Book';
import { User } from './User';

export interface Review {
  _id: number;
  book: Book;
  user: User;
  rating: number;
  comment: string;
  date: string;
}
