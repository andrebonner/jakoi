import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { Auth } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';

export interface DialogData {
  username: string;
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent implements OnInit {
  loginInvalid = false;
  loginForm: any;
  loginAttempt = false;
  formMode: string;
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private authService: AuthService,
    private toast: MatSnackBar
  ) {
    dialogRef.disableClose = true;
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
      remember: new FormControl(),
    });
    this.formMode = 'login';
  }

  ngOnInit(): void {}

  login(): void {
    this.loginAttempt = true;
    this.loginInvalid = false;
    if (this.loginForm.valid) {
      try {
        const user: Auth = this.loginForm.value;
        if (this.formMode === 'login') {
          this.authService
            .login(user)
            .pipe(first())
            .subscribe(
              (response) => {
                this.dialogRef.close();
                this.toast.open('User logged in');
              },
              (err) => console.error(err),
              () => (this.loginAttempt = false)
            );
        } else if (this.formMode === 'forgot_password') {
          this.authService
            .forgotPassword(user)
            .pipe(first())
            .subscribe(
              (response) => {
                this.dialogRef.close();
                this.toast.open('Email sent!');
              },
              (err) => console.error(err),
              () => (this.loginAttempt = false)
            );
        }
      } catch (err) {
        this.loginInvalid = true;
        this.loginAttempt = false;
      }
    } else {
      this.loginAttempt = false;
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  toggleForm(mode: string): void {
    if (mode === 'login') {
      this.loginForm.get('password').setValidators(Validators.minLength(6));
      this.loginForm.get('password').updateValueAndValidity();
    } else {
      this.loginForm.get('password').clearValidators();
      this.loginForm.get('password').updateValueAndValidity();
    }
    this.formMode = mode;
  }
}
