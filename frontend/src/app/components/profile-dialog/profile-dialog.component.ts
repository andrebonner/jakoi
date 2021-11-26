import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models';

export interface ProDialogData {
  user: User;
}

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css'],
})
export class ProfileDialogComponent implements OnInit {
  profileInvalid = false;
  profileAttempt = false;
  profileForm: FormGroup;
  user: User;
  constructor(
    public pdialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProDialogData,
    private toast: MatSnackBar
  ) {
    this.pdialogRef.disableClose = true;
    this.user = data.user;
    this.profileForm = new FormGroup({
      email: new FormControl(this.user.email, []),
      password: new FormControl('', []),
      confirmPassword: new FormControl('', []),
    });
    console.log(this.user);
  }

  ngOnInit(): void {}

  submit(): void {
    this.profileInvalid = false;
    this.profileAttempt = true;
    this.toast.open('Profile saved');
  }
}
