import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '@heroes/components/dialog/dialog.component';

interface IDialogService {
  open(data: any): void;
  close(): void;
}

@Injectable({ providedIn: 'root' })
export class DialogService implements IDialogService {
  private dialogRef?: MatDialogRef<DialogComponent, any>;

  public constructor(private readonly _matDialog: MatDialog) { }


  public open(message?: string): void {

    const matDialogConf: MatDialogConfig = {
      data: message ?? "Are you sure of cancel.",
      width: '600px',
      height: '400px',
      ariaDescribedBy: 'dialog-description',
      disableClose: true,
      // position: {
      //   top: "0",
      //   bottom: "0",
      //   right: "0",
      //   left: "0"
      // }
    };

    this.dialogRef = this._matDialog.open(DialogComponent, matDialogConf);
  }

  public close(): void {
    return this.dialogRef?.close();
  }
}

