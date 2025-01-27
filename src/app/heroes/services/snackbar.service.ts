import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({ providedIn: "root" })
export class SnackBarService {
  public constructor(
    private readonly _snackbar: MatSnackBar
  ) { }

  public open(message: string): void {
    const options: MatSnackBarConfig = {
      duration: 2500
    };

    this._snackbar.open(message, 'Done', options);
  }

  public close(): void {
    this._snackbar.dismiss();
  }
}
