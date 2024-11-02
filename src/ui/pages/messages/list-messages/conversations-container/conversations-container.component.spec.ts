import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationsContainerComponent } from './conversations-container.component';

describe('ConversationsContainerComponent', () => {
  let component: ConversationsContainerComponent;
  let fixture: ComponentFixture<ConversationsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
