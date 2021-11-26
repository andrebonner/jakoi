import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  AdminDialogComponent,
  ProfileDialogComponent,
  RegisterDialogComponent,
} from './components';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { AlertType, isAdmin, Role } from './helpers';
import { Auth } from './models';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { ConfirmService } from './services/confirm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Jakoi';
  currentUser: Auth;
  isAuthenticated = false;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private alert: AlertService,
    private confirm: ConfirmService
  ) {
    this.currentUser = { username: '', password: '', role: 0 };
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      if (user?.token) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }

  ngOnInit(): void {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '30vw',
      height: 'auto',
      data: { name: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('the login dialog was closed');
    });
  }

  logout(): void {
    this.authService.logout();
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '30vw',
      height: 'auto',
      data: { username: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('the register dialog was closed');
    });
  }

  isAdminRole(role: Role): boolean {
    return isAdmin(role);
  }

  editProfile(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '30vw',
      height: 'auto',
      data: { user: this.currentUser },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Closed the profile dialog');
    });
  }

  showAdminDialog(): void {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      width: '100vw',
      height: 'auto',
      data: { user: this.currentUser },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Closed the admin dialog');
    });
  }
}
