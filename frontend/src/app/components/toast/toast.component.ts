import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  displayedColumns = ['id', 'username', 'email', 'role', 'createdAt'];
  users: User[] = [];
  resultLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(
        (users) => {
          this.users = users;
          this.resultLength = users.length;
        },
        (err) => console.error(err),
        () => (this.isLoadingResults = false)
      );
  }
}
