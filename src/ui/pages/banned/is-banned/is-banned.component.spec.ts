import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsBannedComponent } from './is-banned.component';

describe('IsBannedComponent', () => {
  let component: IsBannedComponent;
  let fixture: ComponentFixture<IsBannedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsBannedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsBannedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
