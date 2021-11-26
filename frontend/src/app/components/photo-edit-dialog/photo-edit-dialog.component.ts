import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { AlertType } from 'src/app/helpers';
import { Photo } from 'src/app/models';
import { AlertService } from 'src/app/services/alert.service';
import { PhotoService } from 'src/app/services/photo.service';

export interface PEDialogData {
  photo?: Photo;
}

@Component({
  selector: 'app-photo-edit-dialog',
  templateUrl: './photo-edit-dialog.component.html',
  styleUrls: ['./photo-edit-dialog.component.css'],
})
export class PhotoEditDialogComponent implements OnInit {
  photo: Photo;
  photoInvalid = false;
  photoForm: any;
  photoAttempt = false;

  constructor(
    public dialogRef: MatDialogRef<PhotoEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PEDialogData,
    private photoService: PhotoService,
    private toast: MatSnackBar,
    private alert: AlertService
  ) {
    this.photo = data.photo
      ? data.photo
      : { id: 0, name: '', caption: '', url: '', createdBy: 0 };
    this.photoForm = new FormGroup({
      name: new FormControl(this.photo.name, [Validators.minLength(3)]),
      caption: new FormControl(this.photo.caption, [Validators.maxLength(255)]),
      url: new FormControl(this.photo.url, []),
    });
  }

  ngOnInit(): void {}
  save(): void {
    this.photoInvalid = false;
    this.photoAttempt = true;
    if (this.photoForm.valid) {
      try {
        const photo: Photo = this.photoForm.value;
        if (!this.photo.id) {
          this.photoService
            .create(photo)
            .pipe(first())
            .subscribe(
              (photo) => {
                this.toast.open('Photo created!');
                this.alert.open(
                  'Photo created successfully!',
                  AlertType.SUCCESS
                );
                this.close();
              },
              (err) => console.log(err),
              () => (this.photoAttempt = false)
            );
        } else {
          photo.id = this.photo.id;
          this.photoService
            .update(photo)
            .pipe(first())
            .subscribe(
              (photo) => {
                this.toast.open('Photo updated!');
                this.alert.open('Photo saved successfully!', AlertType.INFO);
              },
              (err) => console.log(err),
              () => (this.photoAttempt = false)
            );
        }
      } catch (err) {
        this.photoInvalid = true;
        this.photoAttempt = false;
      }
    } else {
      this.photoAttempt = false;
    }
  }
  close(): void {
    this.dialogRef.close();
  }
}
