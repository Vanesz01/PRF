import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/Book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Book[]>('http://localhost:5000/app/getAllBooks', {
      withCredentials: true,
    });
  }

  save(book: Book) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('title', book.title);
    body.set('author', book.author);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post('http://localhost:5000/app/saveBook', body, {
      headers: headers,
    });
  }

  addClub(bookId: number | string, clubId: number | string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('bookId', String(bookId));
    body.set('clubId', String(clubId));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put('http://localhost:5000/app/addClubToBook', body, {
      headers: headers,
    });
  }

  setBookOfTheMonth(bookId: number, value: boolean) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('bookId', String(bookId));
    body.set('value', String(value));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put('http://localhost:5000/app/setBookOfTheMonth', body, {
      headers: headers,
    });
  }

  getBookOfTheMonth() {
    return this.http.get<Book>('http://localhost:5000/app/getBookOfTheMonth', {
      withCredentials: true,
    });
  }

  getBooksForClub(clubId: number | string) {
    const params = new HttpParams().set('clubId', clubId);
    return this.http.get<Book[]>('http://localhost:5000/app/getBooksForClub', {
      withCredentials: true,
      params,
    });
  }

  getBook(bookId: number | string) {
    const params = new HttpParams().set('bookId', bookId);
    return this.http.get<Book>('http://localhost:5000/app/getBook', {
      withCredentials: true,
      params,
    });
  }

  addReview(reviewId: number | string, bookId: number | string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('reviewId', String(reviewId));
    body.set('bookId', String(bookId));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put('http://localhost:5000/app/addReviewToBook', body, {
      headers: headers,
    });
  }

  deleteBook(bookId: number | string) {
    const params = new HttpParams().set('bookId', bookId);
    return this.http.delete('http://localhost:5000/app/deleteBook', {
      withCredentials: true,
      params,
    });
  }
}
