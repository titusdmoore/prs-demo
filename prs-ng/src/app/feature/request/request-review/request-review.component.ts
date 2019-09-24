import { Component, OnInit } from '@angular/core';
import { RequestService } from '@svc/request.service';
import { Request } from '@model/request.class';
import { User } from '@model/user.class';
import { SystemService } from '@svc/system.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  title = 'Request Review';
  requests: Request[] = [];
  sortCriteria = 'name';
  sortOrder = 'asc';
  loggedInUser: User;
  rejReason: string;
  rejReq: Request = new Request();
  empty: boolean = true;

  constructor(
    private requestSvc: RequestService,
    private sysSvc: SystemService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.requests = [];
    this.loggedInUser = this.sysSvc.data.user.instance;
    this.requestSvc.getRev().subscribe(resp => {
      let arr = resp as Request[];
      if (this.loggedInUser !== null) {
        for (let x of arr) {
          if (x.user.username !== this.loggedInUser.username) {
            this.requests.push(x);
            this.empty = false;
            console.log(this.empty, "hello");
          }
        }
      } else {
        this.requests = resp as Request[];
        this.empty = false;
        console.log(this.empty, "hello");
      }
    });
    console.log(this.empty);
  }
  refresh() {
    console.log("hello");
    this.requests = [];
    this.loggedInUser = this.sysSvc.data.user.instance;
    this.requestSvc.getRev().subscribe(resp => {
      let arr = resp as Request[];
      if (this.loggedInUser !== null) {
        for (let x of arr) {
          if (x.user.username !== this.loggedInUser.username) {
            this.requests.push(x);
          }
        }
      } else {
        this.requests = resp as Request[];
      }
    });
  }

  sortBy(column: string): void {
    if (this.sortCriteria === column) {
      this.sortOrder = (this.sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortCriteria = column;
      this.sortOrder = 'asc';
    }
  }
}

