import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCardStatsComponent } from './group-card-stats.component';

describe('GroupCardStatsComponent', () => {
  let component: GroupCardStatsComponent;
  let fixture: ComponentFixture<GroupCardStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupCardStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupCardStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
