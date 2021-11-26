import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { first } from 'rxjs/operators';
import { Photo } from 'src/app/models';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photos-tab',
  templateUrl: './photos-tab.component.html',
  styleUrls: ['./photos-tab.component.css'],
})
export class PhotosTabComponent implements OnInit {
  displayedColumns = ['name', 'caption', 'url', 'createdAt'];
  photos: Photo[] = [];
  resultLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService
      .getAll()
      .pipe(first())
      .subscribe(
        (photos) => {
          this.photos = photos;
          this.resultLength = photos.length;
        },
        (err) => console.error(err),
        () => (this.isLoadingResults = false)
      );
  }
}
