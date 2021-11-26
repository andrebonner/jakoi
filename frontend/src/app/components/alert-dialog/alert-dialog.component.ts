import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertType } from 'src/app/helpers';

export interface ADialogData {
  message: string;
  type: AlertType;
}

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
})
export class AlertDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ADialogData,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    dialogRef.disableClose = true;
    iconRegistry.addSvgIcon(
      'Information',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/information.svg')
    );
    iconRegistry.addSvgIcon(
      'Error',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/error.svg')
    );
    iconRegistry.addSvgIcon(
      'Warning',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/warning.svg')
    );
    iconRegistry.addSvgIcon(
      'Success',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/success.svg')
    );
  }

  ngOnInit(): void {}
}
