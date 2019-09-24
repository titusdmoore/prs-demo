export class User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    isReviewer: boolean;
    isAdmin: boolean;

    constructor(id:number = 0, uname: string = '', pword: string = '', fname: string = '', lname: string = '',
    phone: string = '', email: string = '', isreview: boolean = false, isadmin: boolean = false){
        this.id = id;
        this.username = uname;
        this.password = pword;
        this.firstname = fname;
        this.lastname = lname;
        this.phone = phone;
        this.email = email;
        this.isReviewer = isreview;
        this.isAdmin = isadmin;
    }
}
