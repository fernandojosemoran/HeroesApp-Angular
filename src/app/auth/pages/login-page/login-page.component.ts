import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ILoginUser } from '@heroes/interfaces/auth.interface';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { pipe } from 'rxjs';

interface ILoginFields {
  userName: string;
  lastName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  public constructor(
    private readonly _authService: AuthService,
    private readonly _snackbarService: SnackBarService,
    private readonly _router: Router
  ) {}

  private readonly _passwordValidators: ValidatorFn | ValidatorFn[] | null | undefined = [
    Validators.maxLength(100),
    Validators.minLength(3),
    Validators.required
  ];

  private readonly _userNameValidators: ValidatorFn | ValidatorFn[] | null | undefined = [
    Validators.maxLength(50),
    Validators.minLength(4),
    Validators.required
  ];

  public loginForm: FormGroup = new FormGroup({
    userName: new FormControl<string>("", { nonNullable: true, validators: this._userNameValidators }),
    email: new FormControl<string>("", { nonNullable: true, validators: [ Validators.email, Validators.required ] },),
    password: new FormControl<string>("", { nonNullable: true, validators: this._passwordValidators })
  });

  public getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.hasError('required')) return 'This field is required.';
    if (control?.hasError('minlength')) return `Must have at least ${control.errors?.['minlength'].requiredLength} characters.`;
    if (control?.hasError('maxlength')) return `Should not exceed ${control.errors?.['maxlength'].requiredLength} characters.`;
    if (control?.hasError('email')) return 'The email address is not valid.';
    return '';
  }


  public login(): void {
    const { email, password, userName }: ILoginFields = this.loginForm.value;

    if (!this.loginForm.valid) return;

    const responseHandler = (response: string | ILoginUser) => {

      if (typeof response === "string") return this._snackbarService.openUnsuccessSnackbar(response);

      this._router.navigate([ "/heroes/list" ]);
    };

    this._authService.login(userName,email,password)
    .subscribe(pipe(( response ) => responseHandler(response)));
  }
}
