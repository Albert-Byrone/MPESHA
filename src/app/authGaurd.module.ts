import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(): boolean {
    if (!localStorage.getItem('user_id')) {
      this.router.navigate(['/login']); // Redirect to login page if not authenticated
      return false;
    }
    return true;
  }
}
