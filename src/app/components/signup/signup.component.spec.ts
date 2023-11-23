import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { InjectionToken } from '@angular/core';

import { SignupComponent } from './signup.component';
import { ToastrConfig, ToastrService, ToastRef } from 'ngx-toastr';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [
        { provide: ToastrService, useValue: {} },
        {
          provide: new InjectionToken('angularfire2.app.options'),
          useValue: {},
        },
      ],
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
