import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { User } from 'src/app/models';
export interface AdDialogData {
  user: User;
}
@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css'],
})
export class AdminDialogComponent implements OnInit {
  constructor(
    public adialogRef: MatDialogRef<AdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: AdDialogData
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {}
}
