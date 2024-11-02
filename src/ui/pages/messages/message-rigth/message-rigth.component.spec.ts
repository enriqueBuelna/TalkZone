import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRigthComponent } from './message-rigth.component';

describe('MessageRigthComponent', () => {
  let component: MessageRigthComponent;
  let fixture: ComponentFixture<MessageRigthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageRigthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageRigthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
