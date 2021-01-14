import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataContainerPortfolioComponent } from './data-container-portfolio.component';

describe('DataContainerPortfolioComponent', () => {
  let component: DataContainerPortfolioComponent;
  let fixture: ComponentFixture<DataContainerPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataContainerPortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataContainerPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
