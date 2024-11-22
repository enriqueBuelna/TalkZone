import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOfGroupComponent } from './view-of-group.component';

describe('ViewOfGroupComponent', () => {
  let component: ViewOfGroupComponent;
  let fixture: ComponentFixture<ViewOfGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOfGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOfGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
