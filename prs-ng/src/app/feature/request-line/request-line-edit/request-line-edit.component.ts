import { Component, OnInit } from '@angular/core';
import { RequestLine } from '@model/request-line.class';
import { Product } from '@model/product.class';
import { RequestLineService } from '@svc/request-line.service';
import { ProductService } from '@svc/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-line-edit',
  templateUrl: './request-line-edit.component.html',
  styleUrls: ['./request-line-edit.component.css']
})
export class RequestLineEditComponent implements OnInit {
  title: string = 'Edit Request Line';
  requestLine: RequestLine;
  id: number;
  product: Product = new Product();
  products: Product[] = [this.product];

  constructor(
    private reqLineSvc: RequestLineService,
    private prodSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params.id);
    this.reqLineSvc.get(this.id).subscribe(resp => {
      this.requestLine = resp as RequestLine;
      this.product = this.requestLine.product;
      this.prodSvc.list().subscribe(jresp => {
        this.products = jresp as Product[];
      });
    });
    console.log(this.products);
  }

  edit() {
    console.log(this.requestLine);
    this.requestLine.productId = this.requestLine.product.id;
    this.requestLine.product = null;
    this.reqLineSvc.edit(this.requestLine).subscribe(resp => {
      this.router.navigate(['/requestline/list/' + this.requestLine.request.id])
    });
  }
  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }

}
