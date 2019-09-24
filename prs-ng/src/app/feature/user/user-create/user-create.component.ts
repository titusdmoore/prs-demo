import { Component, OnInit } from '@angular/core';
import { User } from '@model/user.class';
import { UserService } from '@svc/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: User = new User();
  title: string = 'Create User';

  constructor(
    private userSvc: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  create(){
    this.userSvc.create(this.user).subscribe(
    resp => {
      console.log(resp);
      this.router.navigateByUrl('/user/list');
    },
    err => { 
      console.log(err);
    }
    );
  }

}
