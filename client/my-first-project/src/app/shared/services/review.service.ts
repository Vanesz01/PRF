import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Review } from '../model/Review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getReviewsForBook(bookId: number | string) {
    const params = new HttpParams().set('bookId', bookId);
    return this.http.get<Review[]>(
      'http://localhost:5000/app/getReviewsForBook',
      {
        withCredentials: true,
        params,
      }
    );
  }

  save(review: Review, bookId: number | string, userId: number | string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('rating', String(review.rating));
    body.set('comment', review.comment);
    body.set('date', String(new Date()));
    body.set('bookId', String(bookId));
    body.set('userId', String(userId));

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put('http://localhost:5000/app/saveReview', body, {
      headers: headers,
    });
  }

  deleteReview(reviewId: number | string) {
    const params = new HttpParams().set('reviewId', reviewId);
    return this.http.delete('http://localhost:5000/app/deleteReview', {
      withCredentials: true,
      params,
    });
  }

  getAll() {
    return this.http.get<Review[]>('http://localhost:5000/app/getAllReviews', {
      withCredentials: true,
    });
  }
}
