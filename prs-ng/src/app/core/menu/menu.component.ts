import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@model/menu-item.class';
import { SystemService } from '@svc/system.service';
import { User } from '@model/user.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [
    new MenuItem('Home', '/home', 'Home'),
    new MenuItem('Users', '/user/list', 'User List'),
    new MenuItem('Vendors', '/vendor/list', 'Vendor List'),
    new MenuItem('Products', '/product/list', 'Product List'),
    new MenuItem('Requests', '/request/list', 'Request List'),
    new MenuItem('Review', '/request/review', 'Request Review'),
    new MenuItem('About', '/about', 'About'),
  ];
  loggedInUser: User = new User();

  constructor(
    private sysSvc: SystemService
  ) { }

  ngOnInit() {
    this.loggedInUser = this.sysSvc.data.user.instance;
  }

}
