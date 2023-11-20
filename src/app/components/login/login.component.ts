import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form!: FormGroup;
  isLogginIn = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    this.isLogginIn = true;
    this.authService
      .signIn({
        email: this.form.value.email,
        password: this.form.value.password,
      })
      .then((resp: any) => {
        // localStorage.setItem('uid', JSON.stringify(resp.user.uid));
        this.router.navigateByUrl('dashboard');
      })
      .catch((error: any) => {
        console.log(error);
        this.toastr.error('Account does not exist');
        this.isLogginIn = false;
      });
  }
}
