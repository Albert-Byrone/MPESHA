import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ButtonOutlineComponent } from './components/button-outline/button-outline.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './firebase.config';
import { AppRoutes } from './routes.module';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';
import { DashboardHeaderComponent } from './pages/dashboard-header/dashboard-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardNavComponent } from './pages/dashboard-nav/dashboard-nav.component';
import { SendFormComponent } from './pages/forms/send-form/send-form.component';
import { WithdrawalFormComponent } from './pages/forms/withdrawal-form/withdrawal-form.component';
import { TopUpFormComponent } from './pages/forms/top-up-form/top-up-form.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    DashboardComponent,
    ButtonOutlineComponent,
    DashboardHeaderComponent,
    DashboardNavComponent,
    SendFormComponent,
    WithdrawalFormComponent,
    TopUpFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutes,
    ToastrModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(firebaseConfig),
    MatDialogModule,
    AngularFirestoreModule,
  ],
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
// private firestore: Fireste/ore = inject(Firestore);
