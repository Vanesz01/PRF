import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Club } from '../shared/model/Club';
import { BookService } from '../shared/services/book.service';
import { Book } from '../shared/model/Book';
import { ClubService } from '../shared/services/club.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-club-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './club-list.component.html',
  styleUrl: './club-list.component.scss',
})
export class ClubListComponent {
  otherClubs?: Club[];
  myClubs?: Club[];
  book?: Book;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private bookService: BookService,
    private clubService: ClubService,
    private router: Router,
    private http: HttpClient,
    private location: Location
  ) {}

  ngOnInit() {
    this.clubService.getMyClubs().subscribe({
      next: (data) => {
        this.myClubs = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.clubService.getNotMyClubs().subscribe({
      next: (data) => {
        this.otherClubs = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
        console.log(err);
      },
    });
    this.bookService.getBookOfTheMonth().subscribe({
      next: (data) => {
        this.book = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getBookTitles(club: Club): string {
    return club!
      .books!.map((book) => `${book.author}: ${book.title}`)
      .join(', ');
  }

  getUserNames(club: Club): string {
    return club!.users!.map((user) => user.name).join(', ');
  }

  addUserToClub(clubId: number) {
    console.log('add');
    this.userService.getCurrent().subscribe({
      next: (user) => {
        console.log(user);
        this.clubService.addUser(user._id, clubId).subscribe({
          next: (data) => {
            console.log(data);
            window.location.reload();
          },
          error: (err) => {
            console.log(err);
          },
        });
        this.userService.addClub(user._id, clubId).subscribe({
          next: (data) => {
            console.log(data);
            window.location.reload();
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onRowClick(clubId: number) {
    this.router.navigate(['/clubs', clubId]);
  }
}
