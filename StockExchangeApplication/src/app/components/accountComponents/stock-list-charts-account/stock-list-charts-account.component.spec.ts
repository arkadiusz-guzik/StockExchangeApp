import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListChartsAccountComponent } from './stock-list-charts-account.component';

describe('StockListChartsAccountComponent', () => {
  let component: StockListChartsAccountComponent;
  let fixture: ComponentFixture<StockListChartsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockListChartsAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListChartsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
