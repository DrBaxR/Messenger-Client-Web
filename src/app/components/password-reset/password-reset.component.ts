import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordReset } from 'src/app/data-models/password-reset';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  submitted = false;
  resetId: string;
  resetPassword: PasswordReset = null;

  passwordInput: FormControl = new FormControl('', [
    Validators.required, Validators.minLength(4)
  ]);
  confirmPasswordInput: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4)]);

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetId = this.route.snapshot.paramMap.get('id');

    this.apiService.getPasswordReset(this.resetId).subscribe(reset => this.resetPassword = reset);
  }

  updatePassword() {
    this.submitted = true;
    if(this.passwordInput.valid && this.passwordInput.value === this.confirmPasswordInput.value) {
      this.apiService.updatePassword(this.resetId, this.passwordInput.value)
        .subscribe(() => this.router.navigate(['/signin']));
    }
  }

}
