import { Product } from './product.class';
import { Request } from '@model/request.class';

export class RequestLine {
    id: number;
    quantity: number;

    productId: number;
    product: Product;

    requestId: number;
    request: Request;

    constructor(
        id: number = 0, qnty: number = 1,
        pId: number = 0, prdct: Product = new Product,
        rId: number = 0, rqst: Request = new Request()
    ){
        this.id = id;
        this.quantity = qnty;
        this.productId = pId;
        this.requestId = rId;
        this.request = rqst;
    }
}