import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInformationComponent } from './profile-information.component';

describe('ProfileInformationComponent', () => {
  let component: ProfileInformationComponent;
  let fixture: ComponentFixture<ProfileInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
