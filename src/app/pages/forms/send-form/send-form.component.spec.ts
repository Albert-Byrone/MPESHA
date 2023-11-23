import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendFormComponent } from './send-form.component';
import { AccountService } from 'src/app/services/account.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { InjectionToken } from '@angular/core';
import { ToastrConfig, ToastrService, ToastRef } from 'ngx-toastr';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockAccountService {
  getUser() {
    return { id: 1, name: 'Mock User' };
  }
}

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
class MockAngularFirestore {
  collection() {
    return {
      doc: () => ({
        valueChanges: () =>
          of({
            /* mock data */
          }),
        set: () => Promise.resolve(),
        // ... other mock methods and properties
      }),
    };
  }
}
const mockAngularFireOptions = new InjectionToken('angularfire2.app.options');

describe('SendFormComponent', () => {
  let component: SendFormComponent;
  let fixture: ComponentFixture<SendFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendFormComponent],
      providers: [
        { provide: AccountService, useClass: MockAccountService },
        { provide: AngularFirestore, useClass: MockAngularFirestore },
        { provide: ToastrService, useClass: MockToastrService },
        { provide: MatDialogRef, useValue: {} },
        {
          provide: new InjectionToken('angularfire2.app.options'),
          useValue: mockAngularFireOptions,
        },
      ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
