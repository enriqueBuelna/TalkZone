import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormVRComponent } from './create-form-vr.component';

describe('CreateFormVRComponent', () => {
  let component: CreateFormVRComponent;
  let fixture: ComponentFixture<CreateFormVRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFormVRComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormVRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
