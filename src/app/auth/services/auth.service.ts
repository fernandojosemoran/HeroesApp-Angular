import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ILoginResponse, ILoginUser } from '@heroes/interfaces/auth.interface';
import { catchError, map, Observable, of } from 'rxjs';

interface IAuthService {
  login(userName: string, email: string, password: string): Observable<ILoginUser | string>;
  refreshToken(): Observable<boolean>;
  logout(): void;
  register(userName: string, email: string,lastName: string,password: string,confirmPassword: string): Observable<string | undefined>;
}

interface IHttpHandlerOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?: {
      includeHeaders?: string[];
  } | boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService implements IAuthService {
  private readonly _baseUrl: string = environment.base_url_api;

  public constructor(
    protected readonly _http: HttpClient
  ) {}

  private httpPost<T>(hostName: string, object?: unknown, config?: IHttpHandlerOptions): Observable<T | undefined> {
    return this._http.post<T>(`${this._baseUrl}${hostName}`, object, config)
    .pipe(catchError((error: HttpErrorResponse) => of(error.error)));
  }

  public login(userName: string, email: string, password: string): Observable<ILoginUser | string> {
    const config: IHttpHandlerOptions = {
      withCredentials: true
    };

    return this.httpPost<ILoginResponse>(`/auth/login`, { userName, email, password }, config)
    .pipe(map((response) => response!.response));
  }

  public register(userName: string, email: string,lastName: string,password: string,confirmPassword: string): Observable<string | undefined> {
    const config: IHttpHandlerOptions = {
      withCredentials: true,
      headers: {
        Authorization: "True",
        "Content-Type": "application/json"
      }
    };

    return this.httpPost<{ response: string | undefined}>(
      "/auth/register",
      {
        userName,
        lastName,
        email,
        password,
        confirmPassword
      },
      config
    ).pipe(map((response) => response!.response));
  }

  public logout(): Observable<boolean> {
    const config: IHttpHandlerOptions = {
      withCredentials: true,
      headers: {
        Authorization: "True",
        "Content-Type": "application/json"
      }
    };

    return this.httpPost("/auth/logout", null, config).pipe(map((res) => !!res));
  }

  public refreshToken(): Observable<boolean> {

    const config = {
      withCredentials: true,
      headers: {
        Authorization: "True",
        "Content-Type": "application/json"
      }
    };

    return this.httpPost<{ response: string | boolean | undefined}>('/auth/refresh-token', null, config)
    .pipe(map((response => {
      if (!response?.response) return false;
      if (typeof response?.response === "string") return false;

      return response.response as boolean;
    })));
  }
}
