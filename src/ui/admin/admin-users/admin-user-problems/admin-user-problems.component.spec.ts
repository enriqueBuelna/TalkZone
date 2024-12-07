import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserProblemsComponent } from './admin-user-problems.component';

describe('AdminUserProblemsComponent', () => {
  let component: AdminUserProblemsComponent;
  let fixture: ComponentFixture<AdminUserProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserProblemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
