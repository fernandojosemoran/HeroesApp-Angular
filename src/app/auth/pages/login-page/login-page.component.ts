import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { ILoginUser } from '@heroes/interfaces/auth.interface';
import { SnackBarService } from '@heroes/services/snackbar.service';
import { pipe } from 'rxjs';

interface ILoginFields {
  userName: string;
  lastName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  public constructor(
    private readonly _authService: AuthService,
    private readonly _snackbarService: SnackBarService,
    private readonly _router: Router
  ) {}

  public loginForm: FormGroup = new FormGroup({
    userName: new FormControl<string>("", { nonNullable: true }),
    email: new FormControl<string>("", { nonNullable: true }),
    password: new FormControl<string>("", { nonNullable: true })
  });

  public login(): void {
    const { email, password, userName }: ILoginFields = this.loginForm.value;

    if (!this.loginForm.valid) return;

    const responseHandler = (response: string | ILoginUser) => {

      if (typeof response === "string") return this._snackbarService.open(response);

      this._router.navigate([ "/heroes/list" ]);
    };

    this._authService.login(userName,email,password)
    .subscribe(pipe(( response ) => responseHandler(response)));
  }
}
