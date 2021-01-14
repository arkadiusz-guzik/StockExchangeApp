import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongTransactionComponent } from './wrong-transaction.component';

describe('WrongTransactionComponent', () => {
  let component: WrongTransactionComponent;
  let fixture: ComponentFixture<WrongTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
