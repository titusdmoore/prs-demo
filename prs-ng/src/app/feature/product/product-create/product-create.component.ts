import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';
import { Vendor } from '@model/vendor.class';
import { VendorService } from '@svc/vendor.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  title = 'Product Create';
  vendor: Vendor = new Vendor(0, '', 'Loading...', '', '', '', '', '', '');
  product: Product = new Product(0, '', '', 0, '', '', 0, this.vendor);
  vendors: Vendor[] = [this.vendor];

  constructor(private prodSvc: ProductService, private vndrSvc: VendorService, private router: Router) { }

  ngOnInit() {
    this.vndrSvc.list().subscribe(resp => {
      this.vendors = resp as Vendor[];
    });
  }

  create() {
    this.product.vendorId = this.product.vendor.id;
    this.product.vendor = null;
    this.prodSvc.create(this.product).subscribe(resp => {
      this.product = resp as Product;
      this.router.navigate(['/product/list']);
    },
    err => {
      console.log(err);
    });
  }
}
