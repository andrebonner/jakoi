import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import {
  PhotoGalleryComponent,
  AuthPageComponent,
  ForgotPasswordComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: PhotoGalleryComponent,
  },

  {
    path: 'auth',
    component: AuthPageComponent,
    children: [
      {
        path: 'forgot-password/:token/:username',
        component: ForgotPasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
