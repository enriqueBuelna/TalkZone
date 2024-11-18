import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverGroupsComponent } from './discover-groups.component';

describe('DiscoverGroupsComponent', () => {
  let component: DiscoverGroupsComponent;
  let fixture: ComponentFixture<DiscoverGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
