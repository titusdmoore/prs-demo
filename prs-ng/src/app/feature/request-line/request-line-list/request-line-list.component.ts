import { Component, OnInit } from '@angular/core';
import { RequestLine } from '@model/request-line.class';
import { RequestLineService } from '@svc/request-line.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '@svc/request.service';
import { Request } from '@model/request.class'
import { User } from '@model/user.class';

@Component({
  selector: 'app-request-line-list',
  templateUrl: './request-line-list.component.html',
  styleUrls: ['./request-line-list.component.css']
})
export class RequestLineListComponent implements OnInit {
  title: string = 'Request Summary';
  requestLines: RequestLine[] = [];
  sortCriteria = 'name';
  sortOrder = 'asc';
  rReqId: number;
  noLines: boolean = this.requestLines != [];

  // Variables To populate the request summary
  user: User = new User(0, '', '', '', '', '', '', false, false)
  req: Request = new Request(0, '', '', '', '', '', 0, 0, this.user);

  constructor(
    private reqlinSvc: RequestLineService,
    private route: ActivatedRoute,
    private reqSvc: RequestService,
    private router: Router
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


  reload(i: number) {
    this.requestLines = [];
    this.reqlinSvc.list().subscribe(resp3 => {
      let arr = resp3 as RequestLine[];
      for (let x of arr) {
        if (x.requestId == this.rReqId && x.id != i) {
          this.requestLines.push(x);
        }
      }
    })
  }
  sortBy(column: string): void {
    if (this.sortCriteria === column) {
      this.sortOrder = (this.sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortCriteria = column;
      this.sortOrder = 'asc';
    }
  }

  submitRev() {
    this.reqSvc.setReview(this.rReqId).subscribe(resp => {
    });
    this.router.navigate(['/request/list']);
  }

  remove(id: number) {
    this.reqlinSvc.delete(id).subscribe(resp => {
    },
      err => {
        console.log('Error deleting Request: ');
        console.log(err);
      });
    this.reload(id);
  }

}
