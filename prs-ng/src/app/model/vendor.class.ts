export class Vendor {
    id: number;
    code: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;

    constructor(id: number = 0, cd: string = '', nm: string = '', addr: string = '', cty: string = '', 
    ste: string = '', zip: string = '', phn: string = '', email: string = ''){
        this.id = id;
        this.code = cd;
        this.name = nm;
        this.address = addr;
        this.city = cty;
        this.state = ste;
        this.phone = phn;
        this.email = email;
    }
}
