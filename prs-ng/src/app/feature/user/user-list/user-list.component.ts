import { Component, OnInit } from '@angular/core';

import { UserService } from '@svc/user.service';
import { User } from '@model/user.class';
import { SystemService } from '@svc/system.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  title: string = 'User List'
  sortCriteria = 'username';
  sortOrder = 'asc';
  isR = false;
  loggedInUser: User
  constructor(
    private userSvc: UserService,
    private sysSvc: SystemService
  ) { }

  ngOnInit() {
    // Check sys service for logged user
    this.loggedInUser = this.sysSvc.data.user.instance;
    console.log("Logged in User"+ this.loggedInUser)
    // Populate List of Users
    this.userSvc.list().subscribe(
      resp => {
        this.users = resp;
        console.log(this.users);
      }
    );
  }

  sortBy(column: string) : void {
    //console.log(this.sortOrder, this.isR);
    if(this.sortCriteria === column){
      this.sortOrder = (this.sortOrder === 'asc' ? 'desc' : 'asc');
      //console.log(this.sortOrder);
      if(this.sortOrder === 'desc'){
        this.isR = true;
      }else {
        this.isR = false;
      }
      //console.log(this.isR);
    }else {
      this.sortCriteria = column;
      this.sortOrder = 'asc';
    }
  }

}
