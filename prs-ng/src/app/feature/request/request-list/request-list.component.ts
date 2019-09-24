import { Component, OnInit } from '@angular/core';
import { RequestService } from '@svc/request.service';
import { Request } from '@model/request.class'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  title = 'Request List';
  requests: Request[];
  sortCriteria = 'name';
  sortOrder = 'asc';
  mySubscription: any;

  constructor(
    private requestSvc: RequestService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(resp => {
      // put the code from `ngOnInit` here
      this.requestSvc.list().subscribe(resp => {
        this.requests = resp as Request[];
        console.log("Constructed");
      });
    });
  }

  ngOnInit() {
    this.requestSvc.list().subscribe(resp => {
      this.requests = resp as Request[];
      console.log(this.requests);
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
