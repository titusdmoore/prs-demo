import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestLineService } from '@svc/request-line.service';
import { RequestService } from '@svc/request.service';
import { Request } from '@model/request.class'
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';
import { RequestLine } from '@model/request-line.class';

@Component({
  selector: 'app-request-line-create',
  templateUrl: './request-line-create.component.html',
  styleUrls: ['./request-line-create.component.css']
})
export class RequestLineCreateComponent implements OnInit {
  rReqId: number;
  title: string = 'Create Request Line'; 
  
  product: Product = new Product(0, '', 'Loading...', 0, '', '', 0, null);
  req: Request = new Request(0, '', '', '', '', '', 0, 0, null);
  products: Product[] = [this.product];
  requestline: RequestLine = new RequestLine(0, 0, 0, this.product, 0, null);


  constructor(
    private reqlinSvc: RequestLineService,
    private route: ActivatedRoute,
    private prodSvc: ProductService,
    private reqSvc: RequestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.rReqId = params.id);
    this.reqSvc.get(this.rReqId).subscribe(rresp => {
      this.req = rresp as Request;
    });
    this.prodSvc.list().subscribe(presp => {
      this.products = presp as Product[];
    });
  }

  create() {
    console.log(this.req);
    this.requestline.request = this.req;
    this.requestline.requestId = this.rReqId;
    this.requestline.productId = this.requestline.product.id;
    this.requestline.product = null;
    this.requestline.requestId = this.requestline.request.id;
    this.requestline.request = null;
    this.reqlinSvc.create(this.requestline).subscribe(resp => {
      this.requestline = resp as RequestLine;
      this.router.navigate(['/requestline/list/' + this.rReqId]);
    },
    err => {
      console.log(err);
    });
  }

}
