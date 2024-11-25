import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageVoiceRoomComponent } from './message-voice-room.component';

describe('MessageVoiceRoomComponent', () => {
  let component: MessageVoiceRoomComponent;
  let fixture: ComponentFixture<MessageVoiceRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageVoiceRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageVoiceRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
