import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/data-models/user';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @ViewChild('dangerAlert', { static: false }) dangerAlert: NgbAlert;
  @ViewChild('successAlert', { static: false }) successAlert: NgbAlert;

  dangerMessage = '';
  successMessage = '';
  private _danger = new Subject<string>();
  private _success;

  alertTimeout = 3000;

  signinForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  flag = true;
  logUser: User;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')) {
      this.router.navigate(['/messenger']);
    }
    
    this._success = this.alertService._success;
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(this.alertTimeout)).subscribe(() => this.successAlert?.close());

    this._danger.subscribe(message => this.dangerMessage = message);
    this._danger.pipe(debounceTime(this.alertTimeout)).subscribe(() => this.dangerAlert?.close());
  }

  validateForm() {
    const res = this.apiService.signin(
      this.signinForm.get('email').value,
      this.signinForm.get('password').value)
      .subscribe({
        next: () => {
          this.router.navigate(['/messenger']);
        },
        error: () => {
          this.flag = false;
          this._danger.next(`Your username or password is invalid!`) 
        }
      });
     
    }
    

}
