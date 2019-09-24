import { Component, OnInit } from '@angular/core';
import { Vendor } from '@model/vendor.class';
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';
import { VendorService } from '@svc/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  title = 'Product Create';
  product = new Product();

  constructor(
    private prodSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(parms => {
      this.prodSvc.get(parms.id).subscribe(resp =>{
        this.product = resp as Product;
      })
    });
  }

  remove() {
    this.prodSvc.delete(this.product.id).subscribe(resp => {
      this.router.navigateByUrl('/product/list');
    },
    err => {
      console.log('Error deleting Product: ');
      console.log(err);
    });
  }
}
