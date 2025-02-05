import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('./src/app/auth/services/auth.service.spec.ts', () => {
  let service: AuthService;
  let httpClientMock: jest.Mocked<HttpClient>;

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

  test('should call an endpoint of login and return a response', (done) => {
    const mockResponse = { response: { userName: 'testUser', email: 'test@test.com' } };
    httpClientMock.post.mockReturnValue(of(mockResponse));

    service.login('testUser', 'test@test.com', 'password123').subscribe(response => {
      expect(response).toEqual(mockResponse.response);
      expect(httpClientMock.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        { userName: 'testUser', email: 'test@test.com', password: 'password123' },
        expect.objectContaining({ withCredentials: true })
      );
      done();
    });
  });


});
