import { Club } from './Club';
import { Review } from './Review';

export interface Book {
  _id: number;
  title: string;
  author: string;
  isBookOfTheMonth?: boolean;
  reviews?: Array<Review>;
  clubs?: Array<Club>;
}
