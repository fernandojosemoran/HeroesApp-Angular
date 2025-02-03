import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ILoginResponse, ILoginUser } from '@heroes/interfaces/auth.interface';
import { catchError, map, Observable, of } from 'rxjs';

interface IAuthService {
  login(userName: string, email: string, password: string): Observable<ILoginUser | string>;
  refreshToken(): Observable<boolean>;
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

@Injectable({ providedIn: "root" })
class HttpHandler {
  private readonly _baseUrl: string = environment.base_url_api;

  public constructor(
     readonly _http: HttpClient
  ) {}

  public post<T>(hostName: string, object?: unknown, config?: IHttpHandlerOptions): Observable<T | undefined> {
    return this._http.post<T>(`${this._baseUrl}${hostName}`, object, config)
    .pipe(
      catchError((error: HttpErrorResponse) => of(error.error))
    );
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService implements IAuthService {

  public constructor(
    protected readonly _http: HttpHandler
  ) {}

  public login(userName: string, email: string, password: string): Observable<ILoginUser | string> {
    const config: IHttpHandlerOptions = {
      withCredentials: true
    };

    return this._http.post<ILoginResponse>(`/auth/login`, { userName, email, password }, config)
    .pipe(map((response) => response!.response));
  }

  public register(userName: string, email: string,lastName: string,password: string,confirmPassword: string): Observable<string | undefined> {
    const config: IHttpHandlerOptions = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    };

    return this._http.post<{ response: string | undefined}>("/auth/register", { userName, lastName, email, password, confirmPassword }, config)
    .pipe(map((response) => response!.response));
  }

  public logout() {
    this._http.post("/auth/logout");
  }

  public refreshToken(): Observable<boolean> {
    const config: IHttpHandlerOptions = {
      withCredentials: true,
      reportProgress: true,
      headers: {
        Authorization: "True",
        "Content-Type": "application/json"
      }
    };

    return this._http.post<{ response: string | boolean | undefined}>('/auth/refresh-token', null, config)
    .pipe(map((response => {
      if (!response) return false;
      if (typeof response === "string") return false;

      return response.response as boolean;
    })));
  }
}
