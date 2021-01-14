import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListHistoryAccountComponent } from './stock-list-history-account.component';

describe('StockListHistoryAccountComponent', () => {
  let component: StockListHistoryAccountComponent;
  let fixture: ComponentFixture<StockListHistoryAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockListHistoryAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListHistoryAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
