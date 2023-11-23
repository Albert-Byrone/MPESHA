import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalFormComponent } from './withdrawal-form.component';
import { ToastrConfig, ToastrService, ToastRef } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';

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

const mockAngularFireOptions = new InjectionToken('angularfire2.app.options');

describe('WithdrawalFormComponent', () => {
  let component: WithdrawalFormComponent;
  let fixture: ComponentFixture<WithdrawalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WithdrawalFormComponent],
      providers: [
        { provide: ToastrService, useClass: MockToastrService },
        {
          provide: new InjectionToken('angularfire2.app.options'),
          useValue: mockAngularFireOptions,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WithdrawalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
