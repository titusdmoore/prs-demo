import { Component, OnInit } from '@angular/core';
import { VendorService } from '@svc/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendor } from '@model/vendor.class';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {
  title: string = 'Edit Vendor';
  vendor: Vendor = new Vendor();

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get vendor from passed id
    this.route.params.subscribe(parms => {
      this.vendorSvc.get(parms.id).subscribe(resp => {
        this.vendor = resp as Vendor;
      })
    });
  }

  edit() {
    this.vendorSvc.edit(this.vendor).subscribe(resp => {
      this.router.navigateByUrl('/vendor/list');
    },
    err => {
      console.log(err);
    });
  }
}
