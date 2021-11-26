import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import * as Sentry from '@sentry/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import {
  AuthPageComponent,
  ForgotPasswordComponent,
  PhotoGalleryComponent,
} from './pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AdminDialogComponent,
  AlertDialogComponent,
  ConfirmDialogComponent,
  ForgotPasswordDialogComponent,
  LoaderComponent,
  LoginDialogComponent,
  PhotoDialogComponent,
  PhotoEditDialogComponent,
  ProfileDialogComponent,
  RegisterDialogComponent,
} from './components';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { PhotosTabComponent } from './components/photos-tab/photos-tab.component';
import { UsersTabComponent } from './components/users-tab/users-tab.component';

@NgModule({
  declarations: [
    AdminDialogComponent,
    AlertDialogComponent,
    AppComponent,
    AuthPageComponent,
    ConfirmDialogComponent,
    ForgotPasswordComponent,
    ForgotPasswordDialogComponent,
    PhotoDialogComponent,
    PhotoEditDialogComponent,
    PhotoGalleryComponent,
    PhotosTabComponent,
    ProfileDialogComponent,
    LoaderComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    UsersTabComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MatDialogRef, useValue: {} },

    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
