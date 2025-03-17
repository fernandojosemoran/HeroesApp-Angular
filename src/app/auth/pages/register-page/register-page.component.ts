import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';

interface IRegisterField {
  userName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {
  public constructor(
    private readonly _authService: AuthService,
    private readonly _snackbarService: SnackBarService,
    private readonly _router: Router
  ) {}

  private readonly _userNameValidations = [
    Validators.required,
    Validators.maxLength(50),
    Validators.minLength(4)
  ];

  private readonly _lastNameValidations = [
    Validators.required,
    Validators.maxLength(50),
    Validators.minLength(4)
  ];

  private readonly _passwordValidations = [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(3)
  ];

  private readonly _confirmPassword = [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(3)
  ];

  public registerForm: FormGroup = new FormGroup({
    userName: new FormControl("", { nonNullable: true, validators: this._userNameValidations }),
    lastName: new FormControl("", { nonNullable: true, validators:  this._lastNameValidations }),
    email: new FormControl("", { nonNullable: true, validators: [ Validators.required,Validators.email ] }),
    password: new FormControl("", { nonNullable: true, validators: this._passwordValidations }),
    confirmPassword: new FormControl("", { nonNullable: true, validators: this._confirmPassword }),
  });

  public getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.hasError('required')) return 'This field is required.';
    if (control?.hasError('minlength')) return `Must have at least ${control.errors?.['minlength'].requiredLength} characters.`;
    if (control?.hasError('maxlength')) return `Should not exceed ${control.errors?.['maxlength'].requiredLength} characters.`;
    if (control?.hasError('email')) return 'The email address is not valid.';
    return '';
  }

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
    .subscribe(
      pipe((response) => {
        if (typeof response === "boolean" && response === true) return this._router.navigate([ "/auth/login" ]);

        return response && this._snackbarService.openUnsuccessSnackbar(response);
      })
    );
  }
}


