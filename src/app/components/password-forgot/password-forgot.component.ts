import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent implements OnInit {
  emailInput: FormControl = new FormControl('', Validators.required);

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

  }

  sendEmail() {
    if(this.emailInput.valid) {
      this.apiService.sendForgotPasswordEmail(this.emailInput.value).subscribe();
    }
  }

}
