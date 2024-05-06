import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserToClubComponent } from './user-to-club.component';

describe('UserToClubComponent', () => {
  let component: UserToClubComponent;
  let fixture: ComponentFixture<UserToClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserToClubComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserToClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
