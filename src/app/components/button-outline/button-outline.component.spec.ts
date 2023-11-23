import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { DashboardComponent } from './dashboard.component';
import { ButtonOutlineComponent } from './button-outline.component';

describe('DashboardComponent', () => {
  let component: ButtonOutlineComponent;
  let fixture: ComponentFixture<ButtonOutlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonOutlineComponent],
    });
    fixture = TestBed.createComponent(ButtonOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
