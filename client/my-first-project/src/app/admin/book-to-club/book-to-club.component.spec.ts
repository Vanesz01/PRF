import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookToClubComponent } from './book-to-club.component';

describe('BookToClubComponent', () => {
  let component: BookToClubComponent;
  let fixture: ComponentFixture<BookToClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookToClubComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookToClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
