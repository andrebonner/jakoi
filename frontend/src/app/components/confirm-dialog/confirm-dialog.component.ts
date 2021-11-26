import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
export interface CDialogData {
  message: string;
  title: string;
  primaryActionText: string;
  secondaryActionText: string;
  primaryActionHandler: () => void;
}
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CDialogData,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    console.log(data);
    iconRegistry.addSvgIcon(
      'information',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/information.svg')
    );
  }

  ngOnInit(): void {}

  primaryActionHandler(): void {
    if (typeof this.data.primaryActionHandler === 'function') {
      this.data.primaryActionHandler();
    }
  }
}
