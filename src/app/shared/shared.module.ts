import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { DetailDialogComponent } from './dialogs/detail-dialog/detail-dialog.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
    DetailDialogComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule,
    MatFormFieldModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class SharedModule { }
