import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectTransactionComponent } from './correct-transaction.component';

describe('CorrectTransactionComponent', () => {
  let component: CorrectTransactionComponent;
  let fixture: ComponentFixture<CorrectTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
