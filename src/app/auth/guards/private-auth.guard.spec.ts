import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { PrivateAuthGuardService } from "./private-auth.guard";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";


describe('./src/app/auth/guard/private-auth.guard.ts', () => {
  let privateAuthGuard: PrivateAuthGuardService;

  const authServiceMock = {
    refreshToken: jest.fn().mockReturnValue(of(true))
  } as unknown  as jest.Mocked<AuthService>;

  const routerMock = {
    navigateByUrl: jest.fn()
  } as unknown as jest.Mocked<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PrivateAuthGuardService,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    privateAuthGuard = TestBed.inject(PrivateAuthGuardService);
  });

  test('Should have properties like canActivate, and canMatch', () => {
    expect(privateAuthGuard).toHaveProperty("canActivate");
    expect(privateAuthGuard).toHaveProperty("canMatch");
  });

  test('Should have canActivate, and canMatch as methods', () => {
    expect(typeof privateAuthGuard.canActivate).toBe("function");
    expect(typeof privateAuthGuard.canMatch).toBe("function");
  });

  test('Should call refreshToken method two times', () => {

    privateAuthGuard.canActivate();
    privateAuthGuard.canMatch();

    expect(authServiceMock.refreshToken).toHaveBeenCalledTimes(2);
  });

  // TODO: add test for detecting if navigateUrl method is called
});
