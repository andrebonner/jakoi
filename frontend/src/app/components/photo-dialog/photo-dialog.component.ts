import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Auth, Photo } from 'src/app/models';
import { isAdmin, Role } from 'src/app/helpers';
import { PhotoEditDialogComponent } from '../photo-edit-dialog/photo-edit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from 'src/app/services/loader.service';

export interface PDialogData {
  photo: Photo;
  isAuthenticated: boolean;
  user: Auth;
}

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.css'],
})
export class PhotoDialogComponent implements OnInit {
  public photo: Photo;
  public isAuthenticated = false;
  public currentUser: Auth;

  constructor(
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PDialogData,
    private dialog: MatDialog,
    private toast: MatSnackBar,
    private loader: LoaderService
  ) {
    this.photo = data.photo;
    this.isAuthenticated = data.isAuthenticated;
    this.currentUser = data.user;
  }

  ngOnInit(): void {}

  openPhotoEditDialog(data: { photo: Photo }): void {
    const dialogRef = this.dialog.open(PhotoEditDialogComponent, {
      width: '30vw',
      height: 'auto',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('the Photo edit dialog was closed');
    });
  }
  isAdminRole(role: Role): boolean {
    return isAdmin(role);
  }
  loaded(): void {}
  edit(): void {
    this.openPhotoEditDialog({ photo: this.photo });
  }
  delete(): void {
    this.toast.open('Deleted');
  }
  close(): void {
    this.dialogRef.close();
  }
}
