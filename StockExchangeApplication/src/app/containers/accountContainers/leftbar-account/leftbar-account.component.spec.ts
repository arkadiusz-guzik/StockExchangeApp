import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftbarAccountComponent } from './leftbar-account.component';

describe('LeftbarAccountComponent', () => {
  let component: LeftbarAccountComponent;
  let fixture: ComponentFixture<LeftbarAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftbarAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftbarAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
