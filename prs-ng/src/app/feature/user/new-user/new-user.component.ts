import { Component, OnInit } from '@angular/core';
import { User } from '@model/user.class';
import { UserService } from '@svc/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  user: User = new User();
  title: string = 'New User';

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
      this.router.navigateByUrl('/user/login');
    },
    err => { 
      console.log(err);
    }
    );
  }

}
