import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SendFormComponent } from '../forms/send-form/send-form.component';
import { WithdrawalFormComponent } from '../forms/withdrawal-form/withdrawal-form.component';
import { TopUpFormComponent } from '../forms/top-up-form/top-up-form.component';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  userTransactions: any;
  status = false;
  showTopUpForm = false;
  balance = 0;
  topup = 0;
  sent = 0;
  addToggle() {
    this.status = !this.status;
  }

  constructor(
    public dialog: MatDialog,
    private accountService: AccountService
  ) {}
  openDialogTopUp() {
    this.dialog.open(TopUpFormComponent);
  }

  openDialogSend() {
    this.dialog.open(SendFormComponent);
  }

  openDialogWithdraw() {
    this.dialog.open(WithdrawalFormComponent);
  }

  ngOnInit(): void {
    this.accountService.getCurrentUser().then((response) => {
      this.balance = response?.wallet!['balance'] || 0;
    });
    this.accountService.getUserTransactions().then((resp) => {
      this.userTransactions = resp;
    });

    this.accountService.getUserDepositTransactions().then((transactions) => {
      const totalAmount = transactions?.reduce(
        (total, transaction) => total + transaction['amount'],
        0
      );
      this.topup = totalAmount ?? 0;
    });

    this.accountService.getUserSentTransactions().then((transactions) => {
      const totalSent = transactions?.reduce(
        (total, transaction) => total + transaction['amount'],
        0
      );
      this.sent = totalSent ?? 0;
    });
  }
}

export type fxn = () => void;
