import { Proposal } from './proposal';

export class JobPost{
    id: string;
    jobCategory: string;
    jobSubCategory: string;
    owner: string;
    jobTitle: string;
    jobDescription: string;
    deadline: string;
    budget: string;
    paymentType: string;
    projectType: string;
    status: string;
    requirements: any[];
    candidates: any[];
    imageURLList: any[];
    atachmentList: any[];

    currency: string;
    createdAt: string;
    updatedAt: string;

    proposals: Proposal[];

    constructor(){
        this.id = '';
        this.jobCategory = '';
        this.jobSubCategory = '';
        this.owner = '';
        this.jobTitle = '';
        this.jobDescription = '';
        this.deadline = '';
        this.budget = '';
        this.paymentType = '';
        this.projectType = '';
        this.status = '';
        this.requirements = [];
        this.candidates = [];
        this.imageURLList = [];
        this.atachmentList = [];

        this.currency = '';
        this.createdAt = '';
        this.updatedAt = '';

        this.proposals = [];
    }

}