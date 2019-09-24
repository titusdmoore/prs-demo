import { Component, OnInit } from '@angular/core';

import { VendorService } from '../../../service/vendor.service';
import { Vendor } from '../../../model/vendor.class';


@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  vendors: Vendor[];
  sortCriteria = 'code';
  sortOrder = 'asc';
  title: string = 'Vendor List';

  constructor(
    private vendorSvc: VendorService
  ) { }

  ngOnInit() {
    this.vendorSvc.list().subscribe(
      resp => {
        this.vendors = resp;
        console.log(this.vendors);
      }
    );
  }

  sortBy(column: string) : void {
    if(this.sortCriteria === column){
      this.sortOrder = (this.sortOrder === 'asc' ? 'desc' : 'asc');
    }else {
      this.sortCriteria = column;
      this.sortOrder = 'asc';
    }
  }

}
