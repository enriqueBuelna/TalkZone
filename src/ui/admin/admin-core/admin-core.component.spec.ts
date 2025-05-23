import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCoreComponent } from './admin-core.component';

describe('AdminCoreComponent', () => {
  let component: AdminCoreComponent;
  let fixture: ComponentFixture<AdminCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
