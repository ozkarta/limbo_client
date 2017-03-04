import { Chatter } from './chatter.model';


export class Message{

    id: string;
    createdAt: string;
    updatedAt: string;

    text: string;
    sender: Chatter;
    seenBy: Chatter[];
    deliveredAt: string;

    constructor(){

        this.id = '';
        this.createdAt = '';
        this.updatedAt = '';

        this.text = '';
        this.sender = new Chatter();
        this.seenBy = [];
        this.deliveredAt = '';
    }
}