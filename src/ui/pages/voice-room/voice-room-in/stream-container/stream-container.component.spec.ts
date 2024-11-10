import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamContainerComponent } from './stream-container.component';

describe('StreamContainerComponent', () => {
  let component: StreamContainerComponent;
  let fixture: ComponentFixture<StreamContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
