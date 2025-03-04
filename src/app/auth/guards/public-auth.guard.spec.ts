import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { PublicAuthGuardService } from "./public-auth.guard";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";


describe('./src/app/auth/guard/private-auth.guard.ts', () => {
  let publicAuthGuard: PublicAuthGuardService;

  const authServiceMock = {
    refreshToken: jest.fn().mockReturnValue(of(true))
  } as unknown  as jest.Mocked<AuthService>;

  const routerMock = {
    navigateByUrl: jest.fn()
  } as unknown as jest.Mocked<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PublicAuthGuardService,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    publicAuthGuard = TestBed.inject(PublicAuthGuardService);
  });

  test('Should have properties like canActivate, and canMatch', () => {
    expect(publicAuthGuard).toHaveProperty("canActivate");
    expect(publicAuthGuard).toHaveProperty("canMatch");
  });

  test('Should have canActivate, and canMatch as methods', () => {
    expect(typeof publicAuthGuard.canActivate).toBe("function");
    expect(typeof publicAuthGuard.canMatch).toBe("function");
  });

  test('Should call refreshToken method two times', () => {

    publicAuthGuard.canActivate();
    publicAuthGuard.canMatch();

    expect(authServiceMock.refreshToken).toHaveBeenCalledTimes(2);
  });

  // TODO: add test for detecting if navigateUrl method is called
});
