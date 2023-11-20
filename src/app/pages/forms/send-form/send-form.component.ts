import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-send-form',
  templateUrl: './send-form.component.html',
})
export class SendFormComponent {
  isLoading = false;
  sendForm!: FormGroup;
  status = false;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<SendFormComponent>
  ) {}

  ngOnInit(): void {
    this.sendForm = this.formBuilder.group({
      amount: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
  addToggle() {
    this.status = !this.status;
  }
  onSendFormSubmit() {
    this.isLoading = true;
    this.accountService
      .sendMoney(this.sendForm.value.email, this.sendForm.value.amount)
      .then((res: any) => {
        this.closeModal();
        this.toastr.success('Sent Succeffuly');
        // window.location.reload();
      })
      .catch((err: any) => {
        this.toastr.error('The account does not exist');
        this.isLoading = false;
      });
  }
}
