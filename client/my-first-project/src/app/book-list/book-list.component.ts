import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from '../shared/model/Book';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../shared/services/book.service';
import { ClubService } from '../shared/services/club.service';
import { Club } from '../shared/model/Club';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  club?: Club;
  clubId: number = -1;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private bookService: BookService,
    private clubService: ClubService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.params.subscribe((params) => {
      this.clubId = params['clubId'];
    });
  }

  ngOnInit() {
    this.clubService.getClub(this.clubId).subscribe({
      next: (data) => {
        this.club = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getClubNames(book: Book): string {
    return book!.clubs!.map((club) => club.name).join(', ');
  }

  onRowClick(bookId: number) {
    this.router.navigate(['clubs/' + this.clubId + '/books', bookId]);
  }

  goBack() {
    this.location.back();
  }
}
