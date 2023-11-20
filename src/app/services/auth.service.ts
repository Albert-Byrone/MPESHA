import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interface/user';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private toastr: ToastrService,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private accountService: AccountService,
    private router: Router
  ) {}

  async signIn(params: signIn) {
    const userExists = await this.accountService.getUserInfoByEmail(
      params.email
    );
    if (userExists) {
      const userCredemtials = this.auth.signInWithEmailAndPassword(
        params.email,
        params.password
      );
      return this.accountService
        .getUserInfoByEmail(params.email)
        .then((resp) => {
          localStorage.setItem('user', JSON.stringify(resp?.account));
          localStorage.setItem('wallet', JSON.stringify(resp?.wallet));
          localStorage.setItem('user_id', resp?.wallet!['userId']);
        });
    } else {
      this.toastr.error('Account Does not exist');
      return;
    }
  }

  async signUp(user: User) {
    localStorage.setItem('user_id', user.uid);
    try {
      const userInf = await this.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      await this.accountService.createAccount(user);
      await this.accountService.createWallet(user);
      return userInf;
    } catch (error) {
      this.toastr.error('An arro has accored');
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user');
    localStorage.removeItem('wallet');
    this.router.navigate(['/login']);
  }
}
type signIn = {
  email: string;
  password: string;
};
