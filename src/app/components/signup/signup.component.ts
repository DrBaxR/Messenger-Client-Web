import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  validateForm() {
    this.apiService
      .signup(
        this.signupForm.get('username').value,
        this.signupForm.get('email').value,
        this.signupForm.get('password').value)
      .subscribe();
  }
}
