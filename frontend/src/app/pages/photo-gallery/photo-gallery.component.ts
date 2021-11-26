import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import {
  PhotoDialogComponent,
  PhotoEditDialogComponent,
} from 'src/app/components';
import { Auth, Photo } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css'],
})
export class PhotoGalleryComponent implements OnInit {
  public photos!: Photo[];
  photosLoad: boolean[];
  currentUser: Auth | undefined;
  isAuthenticated = false;

  constructor(
    private loader: LoaderService,
    private dialog: MatDialog,
    private photoService: PhotoService,
    private authService: AuthService,
    private toast: MatSnackBar
  ) {
    this.photosLoad = [];
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      if (user?.token) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  ngOnInit(): void {
    this.loader.show();
    this.photoService
      .getAll()
      .pipe(first())
      .subscribe(
        (result) => {
          this.photos = result;
          this.photos.forEach((photo) => this.photosLoad.push(false));
        },
        (err) => console.log(err),
        () => this.loader.hide()
      );
  }

  openPhotoDialog(photo: any): void {
    const dialogRef = this.dialog.open(PhotoDialogComponent, {
      width: '300vw',
      height: 'auto',
      data: {
        photo,
        isAuthenticated: this.isAuthenticated,
        user: this.currentUser,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('the photo dialog was closed', result);
    });
  }

  openPhotoEditDialog(): void {
    const dialogRef = this.dialog.open(PhotoEditDialogComponent, {
      width: '30vw',
      height: 'auto',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('the photo edit dialog was closed');
    });
  }

  add(): void {
    this.openPhotoEditDialog();
  }

  loaded(id: number): void {
    const index = this.photos.findIndex((photo) => photo.id === id);
    this.photosLoad[index] = true;
  }

  showProgress(id: number): boolean {
    const index = this.photos.findIndex((photo) => photo.id === id);
    return this.photosLoad && !this.photosLoad[index] ? true : false;
  }

  like(photo: any): void {
    this.toast.open('Photo liked');
  }
  share(photo: any): void {
    this.toast.open('Photo has been shared');
  }
  prod(): void {}
}
