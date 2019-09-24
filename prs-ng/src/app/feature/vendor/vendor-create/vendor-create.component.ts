import { Component, OnInit } from '@angular/core';
import { Vendor } from '@model/vendor.class';
import { VendorService } from '@svc/vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.css']
})
export class VendorCreateComponent implements OnInit {
  vendor: Vendor = new Vendor();
  title: string = 'Create Vendor';

  constructor(
    private vendorSvc: VendorService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  create(){
    this.vendorSvc.create(this.vendor).subscribe(
    resp => {
      console.log(resp);
      this.router.navigateByUrl('/vendor/list');
    },
    err => { 
      console.log(err);
    }
    );
  }
}
