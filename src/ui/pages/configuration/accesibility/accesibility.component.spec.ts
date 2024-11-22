import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesibilityComponent } from './accesibility.component';

describe('AccesibilityComponent', () => {
  let component: AccesibilityComponent;
  let fixture: ComponentFixture<AccesibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesibilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
