import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberVoiceChatComponent } from './member-voice-chat.component';

describe('MemberVoiceChatComponent', () => {
  let component: MemberVoiceChatComponent;
  let fixture: ComponentFixture<MemberVoiceChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberVoiceChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberVoiceChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
