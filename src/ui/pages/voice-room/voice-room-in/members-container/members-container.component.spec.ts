import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersContainerComponent } from './members-container.component';

describe('MembersContainerComponent', () => {
  let component: MembersContainerComponent;
  let fixture: ComponentFixture<MembersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
