import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSkeletonComponent } from './group-skeleton.component';

describe('GroupSkeletonComponent', () => {
  let component: GroupSkeletonComponent;
  let fixture: ComponentFixture<GroupSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
