import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { SnackBarService } from '@heroes/services/snackbar.service';
import { pipe } from 'rxjs';

interface IRegisterField {
  userName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  public constructor(
    private readonly _authService: AuthService,
    private readonly _snackbarService: SnackBarService
  ) {}

  public registerForm: FormGroup = new FormGroup({
    userName: new FormControl("", { nonNullable: true }),
    lastName: new FormControl("", { nonNullable: true }),
    email: new FormControl("", { nonNullable: true }),
    password: new FormControl("", { nonNullable: true }),
    confirmPassword: new FormControl("", { nonNullable: true }),
  });

  public register(): void {
    const {
      userName,
      lastName,
      email,
      password,
      confirmPassword
    }: IRegisterField = this.registerForm.value;

    if (!this.registerForm.valid) return;

    this._authService.register(userName, email, lastName, password, confirmPassword)
    .subscribe(pipe((response) => response && this._snackbarService.open(response)));
  }
}


