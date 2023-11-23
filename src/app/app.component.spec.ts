import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToastrModule, ToastrService } from 'ngx-toastr'; // Import InjectionToken
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { InjectionToken } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ButtonOutlineComponent } from './components/button-outline/button-outline.component';
import { AuthService } from './services/auth.service';
import { TopUpFormComponent } from './pages/forms/top-up-form/top-up-form.component';
import { WithdrawalFormComponent } from './pages/forms/withdrawal-form/withdrawal-form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './pages/dashboard-header/dashboard-header.component';
import { DashboardNavComponent } from './pages/dashboard-nav/dashboard-nav.component';
import { SendFormComponent } from './pages/forms/send-form/send-form.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('AppComponent', () => {
  beforeEach(async () =>
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        ButtonOutlineComponent,
        TopUpFormComponent,
        SendFormComponent,
        WithdrawalFormComponent,
        HomeComponent,
        DashboardNavComponent,
        DashboardHeaderComponent,
        DashboardComponent,
        LoginComponent,
        SignupComponent,
      ],
      imports: [
        RouterTestingModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        ToastrService,
        AuthService,
        MatDialog,
        AngularFirestore,
        { provide: MatDialog, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: InjectionToken, useValue: {} }, // Provide InjectionToken ToastConfig
      ],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Quickk'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Quickk');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'Quickk app is running!'
    );
  });

  it('should contain a router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy(); // Check for router-outlet
  });
});
