import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAccountComponent } from './history-account.component';

describe('HistoryAccountComponent', () => {
  let component: HistoryAccountComponent;
  let fixture: ComponentFixture<HistoryAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
