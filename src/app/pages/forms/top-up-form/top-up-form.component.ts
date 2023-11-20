import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { fxn } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-send-form',
  templateUrl: './top-up-form.component.html',
})
export class TopUpFormComponent {
  isLoading = false;
  topUpForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { refresh: fxn },
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

  onTopUpFormSubmit() {
    this.isLoading = true;
    this.accountService
      .updateWalletAmount(this.topUpForm.value.amount)
      .then((resp) => {
        // this.toastr.success('Your account has been successfuly credited');
        window.location.reload();
      })
      .catch((error: any) => {
        this.isLoading = false;
      });
  }
}
