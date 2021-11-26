import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ForgotPasswordDialogComponent } from 'src/app/components';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthService,
    private loader: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { token, username } = this.route.snapshot.params;
    this.loader.show();
    if (token && username) {
      this.authService
        .verifyEmailToken({ username, password: '', role: 0, token })
        .pipe(first())
        .subscribe(
          (response) => {
            console.log(response);
            this.openForgotPasswordDialog({ username, token });
          },
          (err) => {
            console.error(err);
            this.router.navigateByUrl('/');
            this.loader.hide();
          },
          () => {
            console.log('done');
            this.loader.hide();
          }
        );
    } else {
      // redirect
      this.router.navigateByUrl('/');
    }
  }

  openForgotPasswordDialog(data: { username: any; token: any }): void {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {
      width: '30vw',
      height: 'auto',
      data,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('the forgot password dialog was closed');
    });
  }
}
