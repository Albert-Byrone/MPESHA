import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHeaderComponent } from './dashboard-header.component';
import { InjectionToken } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

const mockAngularFireOptions = new InjectionToken('angularfire2.app.options');

describe('DashboardHeaderComponent', () => {
  let component: DashboardHeaderComponent;
  let fixture: ComponentFixture<DashboardHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardHeaderComponent],
      providers: [
        {
          provide: new InjectionToken('angularfire2.app.options'),
          useValue: {},
        },
        { provide: AngularFirestore, useValue: mockAngularFireOptions },
      ],
    });
    fixture = TestBed.createComponent(DashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
