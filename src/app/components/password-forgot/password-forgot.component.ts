import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent implements OnInit {
  @ViewChild('successAlert') successAlert: NgbAlert;
  @ViewChild('dangerAlert') dangerAlert: NgbAlert;

  emailInput: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  submitted = false;
  successMessage: string = '';
  dangerMessage: string = '';

  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  alertTimeout = 3000;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(this.alertTimeout)).subscribe(() => this.successAlert?.close());

    this._danger.subscribe(message => this.dangerMessage = message);
    this._danger.pipe(debounceTime(this.alertTimeout)).subscribe(() => this.dangerAlert?.close());
  }

  sendEmail() {
    this.submitted = true;
    if(this.emailInput.valid) {
      this.apiService.sendForgotPasswordEmail(this.emailInput.value).subscribe({
        error: error => {
          if ((error as any).status === 200) {
            this._success.next(`Password reset email successfully sent to <b>${this.emailInput.value}</b>`);
          } else {
            this._danger.next(`Could not find and user with the email address <b>${this.emailInput.value}</b>`);
          }
        }
      });
    }
  }

}
