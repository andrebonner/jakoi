import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loader$: any;

  constructor() {}

  add(loader: any): void {
    this.loader$ = loader;
  }
  show(): void {
    this.loader$.show();
  }

  hide(): void {
    this.loader$.hide();
  }
}
