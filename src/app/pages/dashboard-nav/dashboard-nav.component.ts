import { Component } from '@angular/core';
import { User } from 'src/app/interface/user';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-nav',
  templateUrl: './dashboard-nav.component.html',
})
export class DashboardNavComponent {
  firstname!: string;
  lastname!: string;
  user!: {};

  constructor(
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  status = false;
  addToggle() {
    this.status = !this.status;
  }
  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    // Retrieve username from local storage
    this.accountService.getCurrentUser().then((response) => {
      this.firstname = response?.account!['firstName'];
      this.lastname = response?.account!['lastName'];
      this.user = response?.account || {};
    });
    // this.username = localStorage.getItem('user') || '';
  }
}
