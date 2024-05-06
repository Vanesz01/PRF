import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Club } from '../model/Club';
import { Book } from '../model/Book';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Club[]>('http://localhost:5000/app/getAllClubs', {
      withCredentials: true,
    });
  }

  save(club: Club) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('name', club.name);
    body.set('description', club.description);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post('http://localhost:5000/app/saveClub', body, {
      headers: headers,
    });
  }

  addBook(bookId: number | string, clubId: number | string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('bookId', String(bookId));
    body.set('clubId', String(clubId));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put('http://localhost:5000/app/addBookToClub', body, {
      headers: headers,
    });
  }

  addUser(userId: number | string, clubId: number | string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('userId', String(userId));
    body.set('clubId', String(clubId));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put('http://localhost:5000/app/addUserToClub', body, {
      headers: headers,
    });
  }

  getMyClubs() {
    return this.http.get<Club[]>('http://localhost:5000/app/getMyClubs', {
      withCredentials: true,
    });
  }

  getNotMyClubs() {
    return this.http.get<Club[]>('http://localhost:5000/app/getNotMyClubs', {
      withCredentials: true,
    });
  }

  getClub(clubId: number | string) {
    const params = new HttpParams().set('clubId', clubId);
    return this.http.get<Club>('http://localhost:5000/app/getClub', {
      withCredentials: true,
      params,
    });
  }

  deleteClub(clubId: number | string) {
    const params = new HttpParams().set('clubId', clubId);
    return this.http.delete('http://localhost:5000/app/deleteClub', {
      withCredentials: true,
      params,
    });
  }
}
