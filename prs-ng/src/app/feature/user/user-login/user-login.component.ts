import { Component, OnInit } from '@angular/core';
import { UserService } from '@svc/user.service';
import { User } from '@model/user.class';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from '@svc/system.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  user: User;
  users: User[];
  username: string;
  password: string;
  message: string;


  constructor(
    private userSvc: UserService,
    private systemSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userSvc.list().subscribe(
      resp => {
        this.users = resp;
        console.log(this.users);
      }
    );
  }

  login(){
    let uId: number = -1;
    for(let i = 0; i < this.users.length; i++){
      if (this.users[i].username == this.username && this.users[i].password == this.password){
        uId = i;
        this.user = this.users[i];
      }
    }
    if (uId == -1){
      this.user = new User(0, '', '', '', '', '', '', false, false);
      console.log("No user found");
    }
    this.userSvc.loginPost(this.user).subscribe(resp2 =>{
      resp2 as User;
      console.log(resp2.firstname);
      console.log(uId);
      this.user = resp2;
      this.systemSvc.data.user.instance = this.user;
      this.systemSvc.data.user.loggedIn = true;
      this.router.navigateByUrl('/user/list');
    
    },
    err =>{
      console.log(err);
      this.message = 'Login Failed';
    });
  }

}
