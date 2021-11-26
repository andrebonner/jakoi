import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ConfirmDialogComponent, any>
  ) {}
  open(
    message: string,
    title: string = '',
    primaryActionText: string = 'OK',
    secondaryActionText: string = 'Cancel',
    primaryActionHandler?: () => void
  ): void {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30vw',
      height: 'auto',
      data: {
        message,
        title,
        primaryActionText,
        secondaryActionText,
        primaryActionHandler,
      },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      console.log('the confirm dialog was closed');
    });
  }

  close(): void {
    this.dialogRef?.close();
  }
}
