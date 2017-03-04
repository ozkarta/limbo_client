import { Currency } from './currency';
import { Duration } from './duration';
import { Candidate } from './candidate';

export class Proposal{
    id: string;
    hostJobID: string;
    candidate: Candidate;
    price: string;
    currency: Currency;
    duration: Duration;
    coverLetter: string;
    whyToChoose: string;
    offerStatus: string;

    constructor(){
        this.id = '';
        this.hostJobID = '';
        this.candidate = new Candidate();
        this.price = '';
        this.currency = new Currency();
        this.duration = new Duration();
        this.coverLetter = '';
        this.whyToChoose = '';
        this.offerStatus = '';
    }
}