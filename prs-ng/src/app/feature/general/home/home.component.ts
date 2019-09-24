import { Component, OnInit } from '@angular/core';
import { SystemService } from '@svc/system.service';
import { User } from '@model/user.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedUser: User = new User();
  logged: boolean;

  constructor(
    private sysSvc: SystemService
  ) { }

  ngOnInit() {
    this.loggedUser = this.sysSvc.data.user.instance;
    this.logged = this.sysSvc.data.user.loggedIn;
    console.log(this.loggedUser);
    console.log(this.logged);
  }

}
