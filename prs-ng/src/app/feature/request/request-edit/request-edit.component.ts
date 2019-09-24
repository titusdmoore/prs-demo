import { Component, OnInit } from '@angular/core';
import { Request } from '@model/request.class';
import { User } from '@model/user.class';
import { SystemService } from '@svc/system.service';
import { RequestService } from '@svc/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@svc/user.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {
  title: string = 'Edit Request';
  id: number;
  request: Request;
  users: User[];
  delMthds: string[] = ['Delivery', 'Pickup', 'Overnight Delivery', 'Drone'];

  constructor(
    private sysSvc: SystemService,
    private reqSvc: RequestService,
    private userSvc: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params.id);
    console.log(this.id);
    this.reqSvc.get(this.id).subscribe(resp => {
      this.request = resp as Request;
      this.userSvc.list().subscribe(jresp => {
        this.users = jresp as User[];
      });
    });

    console.log(this.request);
    console.log(this.users);
  }

  edit() {
    this.request.userId = this.request.user.id;
    this.request.user = null;
    this.reqSvc.edit(this.request).subscribe(resp => {
      this.request = resp as Request;
      this.router.navigate(['/request/list']);
    });
  }

  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }
}
