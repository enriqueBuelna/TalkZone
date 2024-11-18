import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUserPreferencesComponent } from './modal-user-preferences.component';

describe('ModalUserPreferencesComponent', () => {
  let component: ModalUserPreferencesComponent;
  let fixture: ComponentFixture<ModalUserPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUserPreferencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUserPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
