import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  form!: FormGroup;
  isRegistering = false;

  constructor(
    // private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  register() {
    this.isRegistering = true;
    this.authService
      .signUp({
        email: this.form.value.email,
        password: this.form.value.password,
        uid: uuidv4(),
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        phoneNumber: this.form.value.phoneNumber,
      })
      .then((resp: any) => {
        console.log('response', resp);
        this.toastr.success('Account created.Login to access your wallet');
        this.router.navigateByUrl('login');
      })
      .catch((error: any) => {
        console.log(error);
        this.toastr.error('Account does not exist');
        this.isRegistering = false;
      });
  }
}
