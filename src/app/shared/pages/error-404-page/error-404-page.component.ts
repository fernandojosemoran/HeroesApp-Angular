import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-error-404-page',
  templateUrl: './error-404-page.component.html'
})
export class Error404PageComponent {
  public constructor(
    private readonly _router: Router
  ) {}

  public goHome(): void {
    this._router.navigateByUrl("/heroes/list");
  }
}
