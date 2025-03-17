import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

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
    private readonly _router: Router,
    private readonly _authServices: AuthService
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

  // TODO: Remove this method and implement the logout method in  auth service.ts
  public logOut(): void {
    this._authServices.logout().subscribe((response) => response && this._router.navigate([ "/auth/login" ]));
  }
}
