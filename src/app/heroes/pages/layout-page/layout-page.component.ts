import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { catchError, of, tap } from 'rxjs';

interface ISidebarItem {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'heroes-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {}

  public sidebarItem: ISidebarItem[] = [
    {
      label: "List",
      icon: "label",
      url: "/heroes/list"
    },
    {
      label: "Add",
      icon: "add",
      url: "/heroes/new-hero"
    },
    {
      label: "Search",
      icon: "search",
      url: "/heroes/search-hero"
    }
  ];

  public logOut(): void {
    this._http.post<{ response: boolean }>(`${environment.base_url_api}/auth/logout`, null, { withCredentials: true })
    .pipe(
      catchError((error: HttpErrorResponse) => of(error.error)),
      tap(({ response }) => response && this._router.navigate([ "/auth/login" ]))
    ).subscribe();
  }
}
