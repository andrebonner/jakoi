import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { comparePassword } from 'src/app/helpers/validators';
import { Auth } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';

export interface FPDialogData {
  username: string;
  token: string;
}

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.css'],
})
export class ForgotPasswordDialogComponent implements OnInit {
  loginAttempt = false;
  loginInvalid = false;
  loginForm: any;

  constructor(
    public fpdialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FPDialogData,
    private authService: AuthService,
    private toast: MatSnackBar,
    private router: Router
  ) {
    fpdialogRef.disableClose = true;
    this.loginForm = new FormGroup({
      username: new FormControl(data.username, [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
      confirmPassword: new FormControl('', [comparePassword]),
    });
  }

  ngOnInit(): void {}

  submit(): void {
    this.loginAttempt = true;
    this.loginInvalid = false;
    if (this.loginForm.valid) {
      try {
        const user: Auth = this.loginForm.value;
        user.token = this.data.token;
        this.authService
          .resetPassword(user)
          .pipe(first())
          .subscribe(
            (response) => {
              this.fpdialogRef.close();
              this.toast.open('Password has been reset!');
              this.router.navigateByUrl('/');
            },
            (err) => console.error(err),
            () => (this.loginAttempt = false)
          );
      } catch (err) {
        this.loginInvalid = true;
        this.loginAttempt = false;
      }
    } else {
      this.loginAttempt = false;
    }
  }
  cancel(): void {
    this.fpdialogRef.close();
  }
}
