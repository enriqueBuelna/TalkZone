import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMoreFollowersComponent } from './admin-more-followers.component';

describe('AdminMoreFollowersComponent', () => {
  let component: AdminMoreFollowersComponent;
  let fixture: ComponentFixture<AdminMoreFollowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMoreFollowersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMoreFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
