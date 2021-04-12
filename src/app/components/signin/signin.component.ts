import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
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
  }

  validateForm() {
    const res = this.apiService.signin(
      this.signinForm.get('email').value,
      this.signinForm.get('password').value)
      .subscribe({
        next: () => this.router.navigate(['/messenger']),
        error: () => this.flag = false  
      });
     
    }
    

}
