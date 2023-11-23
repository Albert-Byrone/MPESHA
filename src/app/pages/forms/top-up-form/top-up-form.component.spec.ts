import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { TopUpFormComponent } from './top-up-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InjectionToken } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

describe('TopUpFormComponent', () => {
  let component: TopUpFormComponent;
  let fixture: ComponentFixture<TopUpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopUpFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: new InjectionToken('angularfire2.app.options'),
          useValue: {},
        },
        { provide: AngularFirestore, useValue: {} },
        { provide: ToastrService, useClass: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
