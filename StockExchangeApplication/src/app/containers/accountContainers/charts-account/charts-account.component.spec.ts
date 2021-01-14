import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsAccountComponent } from './charts-account.component';

describe('ChartsAccountComponent', () => {
  let component: ChartsAccountComponent;
  let fixture: ComponentFixture<ChartsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
