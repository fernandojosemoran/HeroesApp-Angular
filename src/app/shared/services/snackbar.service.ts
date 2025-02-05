import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({ providedIn: "root" })
export class SnackBarService {
  public constructor(
    private readonly _snackbar: MatSnackBar
  ) { }

  public openSuccessSnackbar(message: string, keyWord?: string): void {
    const options: MatSnackBarConfig = {
      duration: 2500,
      panelClass: "snackbar-success"
    };

    this._snackbar.open(message, keyWord, options);
  }

  public openUnsuccessSnackbar(message: string, keyWord?: string): void {
    const options: MatSnackBarConfig = {
      duration: 2500,
      panelClass: "snackbar-unsuccess",
      politeness: "assertive"
    };

    this._snackbar.open(message, keyWord, options);
  }

  public close(): void {
    this._snackbar.dismiss();
  }
}
