

export class ProposalHistory{

    jobID: string;
    jobTitle: string;
    price: string;
    currency: string;
    createdAt: string;
    duration: string;

    budget: string;
    deadline: string;


    constructor(){
        this.jobID = '';
        this.jobTitle = '';
        this.price = '';
        this.currency = '';
        this.createdAt = '';
        this.duration = '';
        this.budget = '';
        this.deadline = '';
    }
}