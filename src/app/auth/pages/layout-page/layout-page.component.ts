import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'auth-layout-page',
  templateUrl: './layout-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPageComponent { }
