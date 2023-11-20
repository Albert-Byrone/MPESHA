import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-send-form',
  templateUrl: './top-up-form.component.html',
})
export class TopUpFormComponent {
  isLoading = false;
  topUpForm!: FormGroup;

  constructor(
    private accountService: AccountService,
    public dialogRef: MatDialogRef<TopUpFormComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.topUpForm = this.formBuilder.group({
      amount: ['', [Validators.required]],
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  // async onTopUpFormSubmit() {
  //   this.accountService.updateWalletAmount(this.topUpForm.value.amount);
  //   this.isLoading = true;
  // }

  onTopUpFormSubmit() {
    this.isLoading = true;
    this.accountService
      .updateWalletAmount(this.topUpForm.value.amount)
      .then((resp) => {
        this.closeModal();
        console.log('====', resp);
        // this.toastr.success('Your account has been successfuly credited');
      })
      .catch((error: any) => {
        this.isLoading = false;
      });
  }
}
