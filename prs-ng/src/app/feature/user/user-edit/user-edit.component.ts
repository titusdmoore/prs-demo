import { Component, OnInit } from '@angular/core';
import { UserService } from '@svc/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '@model/user.class';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  title: string = 'Edit User';
  user: User = new User();
  type: string = 'password';

  constructor(
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get User from id that is in request
    this.route.params.subscribe(parms => {
      this.userSvc.get(parms.id).subscribe(resp => {
        this.user = resp as User;
      })
    });
  }

  edit(){
    this.userSvc.edit(this.user).subscribe(
    resp => {
      console.log(resp);
      this.router.navigateByUrl('/user/list');
    },
    err => { 
      console.log(err);
    });
  }
  changeType(){
    console.log(this.type);
    if(this.type === 'password'){
      this.type = 'text';
    }else if(this.type === 'text') {
      this.type = 'password';
    }
    console.log(this.type);
  }
}
