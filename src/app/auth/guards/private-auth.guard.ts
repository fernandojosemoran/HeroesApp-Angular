import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PrivateAuthGuardService implements CanMatch, CanActivate {

  public constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  private checkOutStatus(): Observable<boolean> {
    return this._authService.refreshToken().pipe(tap(isAuthenticated => {
      return !isAuthenticated && this._router.navigateByUrl("/auth/login");
    }));
  }

  public canActivate(): MaybeAsync<GuardResult> {
    return this.checkOutStatus();
  }

  public canMatch(): MaybeAsync<GuardResult> {
    return this.checkOutStatus();
  }
}
