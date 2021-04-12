import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
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

  constructor(private apiService: ApiService,
              private router: Router
    ) { }

  get username(){
    return this.signupForm.get('username');
  }

  get email(){
    return this.signupForm.get('email');
  }

  get password(){
    return this.signupForm.get('password');
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.submitted = true;

    if(this.signupForm.invalid)
      return;

    this.validateForm();
    this.router.navigate(['/signin'])
    alert("Succes\n\n Account created succesfully\n");
    
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
