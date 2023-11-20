import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Wallet } from '../interface/wallet';
import { User } from '../interface/user';
import { Observable, switchMap, of } from 'rxjs';
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

  signIn(params: signIn) {
    const userCredemtials = this.auth.signInWithEmailAndPassword(
      params.email,
      params.password
    );
    const user = this.accountService
      .getUserInfoByEmail(params.email)
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp?.account));
        localStorage.setItem('wallet', JSON.stringify(resp?.wallet));
        localStorage.setItem('user_id', resp?.wallet!['userId']);
      });
    return user;
  }

  async signUp(user: User) {
    localStorage.setItem('user_id', user.uid);
    try {
      //Sign Up the user with the email and password
      const userInf = await this.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      // Create the user data and store in firestore
      await this.accountService.createAccount(user);
      await this.accountService.createWallet(user);
      console.log(userInf);
      return userInf;
      // HAndle any error
    } catch (error) {
      this.toastr.error('An arro has accored');
      return null;
    }
  }

  logout() {
    localStorage.removeItem('user_id'); // Remove the user ID from local storage
    this.router.navigate(['/login']); // Redirect to the login page
    // You can also add any additional logout logic here, such as signing out from Firebase
  }
}
type signIn = {
  email: string;
  password: string;
};
