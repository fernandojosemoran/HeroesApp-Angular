import { Injectable } from "@angular/core";
import { CanActivate, CanMatch, GuardResult, MaybeAsync, Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class PublicAuthorizationAccountGuard implements CanActivate, CanMatch{
  public constructor(private readonly _router: Router){}

  private isAuthorizationAccountPath(): boolean {
    if (!this._router.url) return true;

    console.warn({ url: this._router.url, router: this._router });

    if (this._router.url.startsWith('/api/account/authorization')) return false;

    return true;
  }

  public canMatch(): MaybeAsync<GuardResult> {
    return this.isAuthorizationAccountPath();
  }

  public canActivate(): MaybeAsync<GuardResult> {
    return this.isAuthorizationAccountPath();
  }
}
