import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationProfileComponent } from './information-profile.component';

describe('InformationProfileComponent', () => {
  let component: InformationProfileComponent;
  let fixture: ComponentFixture<InformationProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
