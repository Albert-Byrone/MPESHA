import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ToastrConfig, ToastrService, ToastRef } from 'ngx-toastr';

class MockToastrService {
  success(
    message: string,
    title?: string,
    override?: Partial<ToastrConfig>
  ): ToastRef<any> {
    // Implement mock behavior for the success method
    return {} as ToastRef<any>;
  }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: ToastrService, useClass: MockToastrService }],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
