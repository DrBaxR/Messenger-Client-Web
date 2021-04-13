import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @ViewChild('dangerAlert', { static: false }) dangerAlert: NgbAlert;
  dangerMessage = '';
  private _danger = new Subject<string>();

  alertTimeout = 3000;

  signinForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  flag = true;
  logUser: User;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
