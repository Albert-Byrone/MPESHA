import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-withdrawal-form',
  templateUrl: './withdrawal-form.component.html',
})
export class WithdrawalFormComponent {
  isLoading = false;
  withdrawalForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService,
    public dialogRef: MatDialogRef<WithdrawalFormComponent>
  ) {}

  closeModal() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.withdrawalForm = this.formBuilder.group({
      amount: ['', [Validators.required]],
    });
  }

  onWithdrawFormSubmit() {
    this.isLoading = true;
    this.accountService
      .withdrawFromWallet(this.withdrawalForm.value.amount)
      .then((resp) => {
        console.log('respo', resp);
        this.closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
