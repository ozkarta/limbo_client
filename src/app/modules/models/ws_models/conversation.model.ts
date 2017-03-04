import { Chatter } from './chatter.model';
import { Message } from './message.model';
import { Subject } from './subject.model';

export class Conversation{

    Id: string;
    me: Chatter;
    otherChatters: Chatter[];
    subject: Subject;
    message: Message[];


    constructor(){
        this.Id = '';
        this.me = new Chatter();
        this.otherChatters = [];
        this.subject = new Subject();
        this.message = [];
    }
}