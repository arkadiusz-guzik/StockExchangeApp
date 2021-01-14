import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionTimeComponent } from './session-time.component';

describe('SessionTimeComponent', () => {
  let component: SessionTimeComponent;
  let fixture: ComponentFixture<SessionTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
