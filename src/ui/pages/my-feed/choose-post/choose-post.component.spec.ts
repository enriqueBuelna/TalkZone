import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePostComponent } from './choose-post.component';

describe('ChoosePostComponent', () => {
  let component: ChoosePostComponent;
  let fixture: ComponentFixture<ChoosePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoosePostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoosePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
