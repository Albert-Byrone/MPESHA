import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ButtonOutlineComponent } from './components/button-outline/button-outline.component';
import { AuthService } from './services/auth.service';
import { TopUpFormComponent } from './pages/forms/top-up-form/top-up-form.component';
import { WithdrawalFormComponent } from './pages/forms/withdrawal-form/withdrawal-form.component';
describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        ButtonOutlineComponent,
        WithdrawalFormComponent,
        TopUpFormComponent,
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
        { provide: MatDialog, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
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
