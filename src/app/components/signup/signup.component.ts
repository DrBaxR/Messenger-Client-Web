import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('successAlert', { static: false }) successAlert: NgbAlert;
  @ViewChild('dangerAlert', { static: false }) dangerAlert: NgbAlert;

  private _success = new Subject<string>();
  private _danger = new Subject<string>();

  successMessage = '';
  dangerMessage = '';
  alertTimeout = 3000;

  submitted = false;
  icon = '<span class="material-icons"style="font-size: 30px;">account_circle</span>'

  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService
  ) { }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  ngOnInit(): void {
    this._success = this.alertService._success;
    this._danger = this.alertService._danger;

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(this.alertTimeout)).subscribe(() => this.successAlert?.close());

    this._danger.subscribe(message => this.dangerMessage = message);
    this._danger.pipe(debounceTime(this.alertTimeout)).subscribe(() => this.dangerAlert?.close());
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this._danger.next(`Wrong credentials`);
      return;
    }

    this.validateForm();
  }

  validateForm() {
    this.apiService
      .signup(
        this.signupForm.get('username').value,
        this.signupForm.get('email').value,
        this.signupForm.get('password').value)
      .subscribe({
        // nu intreba de ce e asa, ii un jeg in backend
        error: (res: HttpErrorResponse) => {
          if(res.status === 200) {
            this.router.navigate(['/signin']);
            this.alertService.sendSuccess('Signed up successfully!', 300);
          } else {
            this.alertService.sendDanger('Email taken')
          }
        }
      });
  }
}
