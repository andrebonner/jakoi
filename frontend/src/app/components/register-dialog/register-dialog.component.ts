import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
export interface RDialogData {
  username: string;
}
@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
})
export class RegisterDialogComponent implements OnInit {
  registerInvalid = false;
  registerForm: any;
  registerAttempt = false;

  constructor(
    public rdialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RDialogData,
    private authService: AuthService,
    private toast: MatSnackBar
  ) {
    rdialogRef.disableClose = true;
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.email]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
      confirmPassword: new FormControl('', []),
    });
  }

  ngOnInit(): void {}

  submit(): void {
    this.registerAttempt = true;
    this.registerInvalid = false;
    if (this.registerForm.valid) {
      try {
        const user: User = this.registerForm.value;
        user.role = 1;
        this.authService
          .register(user)
          .pipe(first())
          .subscribe(
            (response) => {
              this.rdialogRef.close();
              this.toast.open('User Registered!');
            },
            (err) => console.error(err),
            () => (this.registerAttempt = false)
          );
      } catch (error) {
        this.registerAttempt = false;
        this.registerInvalid = true;
      }
    } else {
      this.registerAttempt = false;
    }
  }

  cancel(): void {
    this.rdialogRef.close();
  }
}
