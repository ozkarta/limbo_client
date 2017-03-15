export class Candidate{
    id: string;
    contactPhone: string;
    createdAt: string;
    updatedAt: string;
    userName: string;
    email: string;
    fName: string;
    lName: string;
    userRole: string;
    feadback: any[];

    portfolio: any[];
    services: any[];
    subscribes: any[];
    subscribers: any[];

    

    constructor(){
        this.id = '';
        this.contactPhone = '';
        this.createdAt = '';
        this.updatedAt = '';
        this.userName = '';
        this.email = '';
        this.fName = '';
        this.lName = '';
        this.userRole = '';
        this.feadback = [];
        
        this.portfolio = [];
        this.services = [];
        this.subscribes = [];
        this.subscribers = [];
        
    }
}