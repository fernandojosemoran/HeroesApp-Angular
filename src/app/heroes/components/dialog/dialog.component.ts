import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogService } from '@heroes/services/dialog.service';

@Component({
  selector: 'heroes-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  public constructor(
    private readonly _dialogService: DialogService,
    private readonly _router: Router
  ) { }

  public data = inject<string>(MAT_DIALOG_DATA);

  public confirm() {
    this._router.navigate(["/heroes/list"]);
  }

  public cancel() {
    this._dialogService.close()
  }
}
