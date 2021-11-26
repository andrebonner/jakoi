import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  showLoader: boolean;
  constructor(private loaderService: LoaderService) {
    this.showLoader = false;
  }

  ngOnInit() {
    this.loaderService.add(this);
  }

  show() {
    this.showLoader = true;
  }

  hide() {
    this.showLoader = false;
  }
}
