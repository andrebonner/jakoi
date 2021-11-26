import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components';
import { AlertType } from '../helpers';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AlertDialogComponent, any>
  ) {}

  open(message: string, type: AlertType): void {
    this.dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '30vw',
      height: 'auto',
      data: { message, type },
    });

    this.dialogRef.afterClosed().subscribe(() => {
      console.log('the alert was closed');
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
