import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListPortfolioAccountComponent } from './stock-list-portfolio-account.component';

describe('StockListPortfolioAccountComponent', () => {
  let component: StockListPortfolioAccountComponent;
  let fixture: ComponentFixture<StockListPortfolioAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockListPortfolioAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListPortfolioAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
