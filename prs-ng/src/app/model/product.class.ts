import { Vendor } from './vendor.class';

export class Product {
    id: number;
    partNbr: string;
    name: string;
    price: number;
    unit: string;
    photoPath: string;
    vendorId: number;
    vendor: Vendor;

    constructor(id:number = 0, partNbr: string = '',
     name: string = '', price: number = 0,
    unit: string = '', photoPath: string = '',
     vendorId: number = 0, vendor: Vendor = new Vendor()){
        this.id = id;
        this.partNbr = partNbr;
        this.name = name;
        this.price = price;
        this.unit = unit;
        this.photoPath = photoPath;
        this.vendorId = vendorId;
        this.vendor = vendor;
    }
}
