import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAccountComponent } from './portfolio-account.component';

describe('PortfolioAccountComponent', () => {
  let component: PortfolioAccountComponent;
  let fixture: ComponentFixture<PortfolioAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
