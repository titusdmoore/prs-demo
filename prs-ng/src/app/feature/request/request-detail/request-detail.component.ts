import { Component, OnInit } from '@angular/core';
import { RequestService } from '@svc/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from '@svc/system.service';
import { UserService } from '@svc/user.service';
import { Request } from '@model/request.class'

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  title: string = 'Request Detail';
  request: Request;

  constructor(
    private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router,
    private sysSvc: SystemService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(parms => {
      this.requestSvc.get(parms.id).subscribe(resp =>{
        this.request = resp as Request;
      })
    });
  }

  remove() {
    this.requestSvc.delete(this.request.id).subscribe(resp => {
      this.router.navigateByUrl('/request/list');
    },
    err => {
      console.log('Error deleting Request: ');
      console.log(err);
    });
  }
}
