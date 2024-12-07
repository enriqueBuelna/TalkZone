import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardStatsComponent } from './user-card-stats.component';

describe('UserCardStatsComponent', () => {
  let component: UserCardStatsComponent;
  let fixture: ComponentFixture<UserCardStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
