import { Component, OnInit } from '@angular/core';

import { RequestLineService } from '@svc/request-line.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '@svc/request.service';
import { Request } from '@model/request.class';
import { User } from '@model/user.class';
import { RequestLine } from '@model/request-line.class';
import { RequestReviewComponent } from '../request-review/request-review.component';

@Component({
  selector: 'app-request-review-detail',
  templateUrl: './request-review-detail.component.html',
  styleUrls: ['./request-review-detail.component.css']
})
export class RequestReviewDetailComponent implements OnInit {
  title: string = 'Request Summary';
  requestLines: RequestLine[] = [];
  sortCriteria = 'name';
  sortOrder = 'asc';
  rReqId: number;
  rejReq: Request = new Request(0, '', '', '', '', '', null);
  noLines: boolean = this.requestLines != [];

  user: User = new User(0, '', '', '', '', '', '', false, false)
  req: Request = new Request(0, '', '', '', '', '', 0, 0, this.user);


  constructor(
    private reqlinSvc: RequestLineService,
    private route: ActivatedRoute,
    private reqSvc: RequestService,
    private router: Router,
    private revComp: RequestReviewComponent
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.rReqId = params.id);
    console.log(this.rReqId);
    this.reqlinSvc.list().subscribe(resp => {
      let arr = resp as RequestLine[];
      for (let x of arr) {
        if (x.requestId == this.rReqId) {
          this.requestLines.push(x);
        }
      }
      console.log(this.requestLines);
      this.reqSvc.get(this.rReqId).subscribe(rresp => {
        this.req = rresp as Request;
        console.log(rresp);
        console.log(this.req);
      })
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


  setApp(id: number) {
    this.reqSvc.setApproved(id).subscribe(resp => {
      this.router.navigate(['/request/review']);
      this.revComp.requests = [];
      this.revComp.refresh();
    });
  }

  setRejReq(r: Request) {
    this.rejReq = r;
    console.log(this.rejReq);
  }

  setRej(id: number) {
    this.reqSvc.edit(this.req).subscribe(resp2 => {
      this.reqSvc.setRej(id).subscribe(resp => {
        this.router.navigate(['/request/review']);
        this.revComp.requests = [];
        this.revComp.refresh();
      });
    });
  }
}
