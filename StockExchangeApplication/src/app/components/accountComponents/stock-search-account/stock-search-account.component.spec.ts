import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSearchAccountComponent } from './stock-search-portfolio-account.component';

describe('StockSearchAccountComponent', () => {
  let component: StockSearchAccountComponent;
  let fixture: ComponentFixture<StockSearchAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSearchAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSearchAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
