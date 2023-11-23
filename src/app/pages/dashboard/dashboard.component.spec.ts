import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InjectionToken } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const mockAngularFireOptions = new InjectionToken('angularfire2.app.options');
class MockAccountService {
  getUser() {
    return { id: 1, name: 'Mock User' };
  }
  getCurrentUser() {
    return { id: 1, name: 'Mock User' };
  }
}
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: AccountService, useCLass: MockAccountService },
        { provide: AngularFirestore, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialog, useValue: {} },
        {
          provide: new InjectionToken('angularfire2.app.options'),
          useValue: mockAngularFireOptions,
        },
      ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
