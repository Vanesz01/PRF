import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>('http://localhost:5000/app/getAllUsers', {
      withCredentials: true,
    });
  }

  addClub(userId: number | string, clubId: number | string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('userId', String(userId));
    body.set('clubId', String(clubId));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put('http://localhost:5000/app/addClubToUser', body, {
      headers: headers,
    });
  }

  getCurrent() {
    return this.http.get<User>('http://localhost:5000/app/getCurrentUser', {
      withCredentials: true,
    });
  }

  changeUserData(
    userId: number | string,
    name: string,
    nickname: string,
    address: string
  ) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('userId', String(userId));
    body.set('name', String(name));
    body.set('nickname', String(nickname));
    body.set('address', String(address));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put('http://localhost:5000/app/changeUserData', body, {
      headers: headers,
    });
  }

  addReview(reviewId: number | string, userId: number | string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('reviewId', String(reviewId));
    body.set('userId', String(userId));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put('http://localhost:5000/app/addReviewToUser', body, {
      headers: headers,
    });
  }

  deleteUser(userId: number | string) {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete('http://localhost:5000/app/deleteUser', {
      withCredentials: true,
      params,
    });
  }
}
