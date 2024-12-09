import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchConnectComponent } from './search-connect.component';

describe('SearchConnectComponent', () => {
  let component: SearchConnectComponent;
  let fixture: ComponentFixture<SearchConnectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchConnectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
