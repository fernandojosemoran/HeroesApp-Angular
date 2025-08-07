import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

interface LoginUser {
  userName: string;
  email: string;
  password: string;
}

interface RegisterUser extends LoginUser {
  lastName: string;
  confirmPassword: string;
}

describe('./src/app/auth/services/auth.service.ts', () => {
  let service: AuthService;
  let httpClientMock: jest.Mocked<HttpClient>;

  const loginUser: LoginUser = {
    userName: 'testUser',
    email: 'test@gmail.com',
    password: 'password-test123'
  };

  const registerUser: RegisterUser = {
    userName: 'testUser',
    lastName: "jest",
    email: 'test@gmail.com',
    password: 'password-test123',
    confirmPassword: 'password-test123'
  };

  beforeEach(() => {
    httpClientMock = {
      post: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  test('should call an endpoint of login and return a response type string | ILoginUser', (done) => {
    const mockResponse = { response: loginUser };

    httpClientMock.post.mockReturnValue(of(mockResponse));

    service.login(loginUser.userName, loginUser.email, loginUser.password).subscribe(response => {
      expect(response).toEqual(mockResponse.response);

      expect(httpClientMock.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        loginUser,
        expect.objectContaining({ withCredentials: true })
      );

      done();
    });
  });

  test('should call an endpoint of register and return a response type string | undefined', (done) => {
    const mockResponse = { response: 'User created successfully' };

    httpClientMock.post.mockReturnValue(of(mockResponse));

    service.register(registerUser.userName, registerUser.email, registerUser.lastName, registerUser.password, registerUser.confirmPassword).subscribe(response => {
      expect(response).toEqual(mockResponse.response);

      expect(httpClientMock.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        registerUser,
        expect.objectContaining({
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: "True"
          }
        })
      );

      done();
    });
  });

  // test('should call an endpoint of logout', () => {
  //   service.logout();

  //   expect(httpClientMock.post).toHaveBeenCalledWith(
  //     expect.stringContaining('/auth/logout'),
  //     undefined,
  //     undefined
  //   );
  // });

  test('should call an endpoint of refreshToken and return a response type boolean', (done) => {
    const mockResponse = { response: true };

    httpClientMock.post.mockReturnValue(of(mockResponse));

    service.refreshToken().subscribe(response => {
      expect(response).toEqual(mockResponse.response);

      expect(httpClientMock.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/refresh-token'),
        null,
        expect.objectContaining({
          withCredentials: true,
          // reportProgress: true,
          headers: {
            Authorization: 'True',
            'Content-Type': 'application/json'
          }
        })
      );

      done();
    });
  });
});
