import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomContainerComponent } from './room-container.component';

describe('RoomContainerComponent', () => {
  let component: RoomContainerComponent;
  let fixture: ComponentFixture<RoomContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
