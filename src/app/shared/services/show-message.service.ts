import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly translate: TranslateService,
    ) { }

  showInfoSnackBar(message: string, duration: number) {
    this._snackBar.open(message, undefined, {announcementMessage: message, duration});
  }
}
