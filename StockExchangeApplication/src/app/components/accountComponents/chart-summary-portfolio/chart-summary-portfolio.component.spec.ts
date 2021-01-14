import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSummaryPortfolioComponent } from './chart-summary-portfolio.component';

describe('ChartSummaryPortfolioComponent', () => {
  let component: ChartSummaryPortfolioComponent;
  let fixture: ComponentFixture<ChartSummaryPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSummaryPortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSummaryPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
