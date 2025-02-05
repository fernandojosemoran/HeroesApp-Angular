import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { SnackBarService } from '@shared/services/snackbar.service';
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
  templateUrl: './register-page.component.html'
})
export class RegisterPageComponent {
  public constructor(
    private readonly _authService: AuthService,
    private readonly _snackbarService: SnackBarService
  ) {}

  public registerForm: FormGroup = new FormGroup({
    userName: new FormControl("", { nonNullable: true, validators: [ Validators.required,Validators.maxLength(50),Validators.minLength(4) ] }),
    lastName: new FormControl("", { nonNullable: true, validators: [ Validators.required,Validators.maxLength(50),Validators.minLength(4) ] }),
    email: new FormControl("", { nonNullable: true, validators: [ Validators.required,Validators.email ] }),
    password: new FormControl("", { nonNullable: true, validators: [ Validators.required,Validators.maxLength(100),Validators.minLength(3) ] }),
    confirmPassword: new FormControl("", { nonNullable: true, validators: [ Validators.required,Validators.maxLength(100),Validators.minLength(3) ] }),
  });

  public getErrorMessages(field: string) {
    const control = this.registerForm.get(field);
    if (control?.hasError("required")) return "Field is required.";
    if (control?.hasError("minlength")) return `Must have at least ${ control.errors?.["minlength"].requiredLength } characters.`;
    if (control?.hasError("maxlength")) return `Should not exceed ${ control.errors?.["maxlength"].requiredLength } characters.`;
    if (control?.hasError('email')) return 'The email address is not valid.';
    return "";
  }

  // "minlength" | "maxlength" | "email" | "password" | "required";

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
    .subscribe(pipe((response) => response && this._snackbarService.openUnsuccessSnackbar(response)));
  }
}


