import { Component, OnInit } from '@angular/core';
import { User } from '@model/user.class';
import { Request } from '@model/request.class'
import { RequestService } from '@svc/request.service';
import { UserService } from '@svc/user.service';
import { Router } from '@angular/router';
import { SystemService } from '@svc/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title: string = 'Create Request';
  user: User = new User(0, '', '', '', '', '', '', false, false);
  users: User[] = [this.user];
  statusList: string[] = ['New', 'Review', 'Rejected', 'Revised', 'Approved'];
  delMthds: string[] = ['Delivery', 'Pickup', 'Overnight Delivery', 'Drone'];
  loggedUser: User = new User();
  name: string = this.loggedUser.username;
  request: Request = new Request(0, '', '', '', 'New', '', 0, 0, null);
  
  constructor(
    private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router,
    private sysSvc: SystemService) { }

  ngOnInit() {
    this.userSvc.list().subscribe(resp => {
      this.users = resp as User[];
    });
    this.loggedUser = this.sysSvc.data.user.instance;
  }

  create() {
    this.request.user = this.loggedUser;
    this.request.userId = this.request.user.id;
    this.request.user = null;
    console.log(this.request);
    this.requestSvc.create(this.request).subscribe(resp => {
      this.request = resp as Request;
      this.router.navigate(['/request/list']);
    },
    err => {
      console.log(err);
    });
  }
}
