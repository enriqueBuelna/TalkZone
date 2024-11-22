import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGroupsCreatedComponent } from './my-groups-created.component';

describe('MyGroupsCreatedComponent', () => {
  let component: MyGroupsCreatedComponent;
  let fixture: ComponentFixture<MyGroupsCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyGroupsCreatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGroupsCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
