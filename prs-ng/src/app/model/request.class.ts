import { User } from './user.class';

export class Request {
    id: number;
    description: string;
    justification: string;
    rejectionReason: string;
    status: string;
    deliveryMode: string;
    total: number;
    userId: number;
    user: User;

    constructor(id: number = 0, desc: string = '',
        just: string = '', rR: string = '',
        sts: string = '', dm: string = '', total: number = 0,
        usId: number = 0, u: User = new User()) {
        this.id = id;
        this.description = desc;
        this.justification = just;
        this.rejectionReason = rR;
        this.status = sts;
        this.deliveryMode = dm;
        this.total = total;
        this.userId = usId;
        this.user = u;
    }

    
}
