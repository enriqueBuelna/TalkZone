import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPresentationComponent } from './group-presentation.component';

describe('GroupPresentationComponent', () => {
  let component: GroupPresentationComponent;
  let fixture: ComponentFixture<GroupPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupPresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
