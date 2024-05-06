import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOfTheMonthComponent } from './book-of-the-month.component';

describe('BookOfTheMonthComponent', () => {
  let component: BookOfTheMonthComponent;
  let fixture: ComponentFixture<BookOfTheMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookOfTheMonthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookOfTheMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
