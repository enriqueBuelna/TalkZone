import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFeedComponent } from './my-feed.component';

describe('MyFeedComponent', () => {
  let component: MyFeedComponent;
  let fixture: ComponentFixture<MyFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
