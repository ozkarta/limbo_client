import { ConversationUser } from './conversation-user.model';
import { Message } from './message.model';

export class Conversation{
    // Chat Specific
    id: string;
    me: ConversationUser;
    chatters: ConversationUser [];
    subject: string;
    messages: Message[];
    //  Comunication Specific
    lastResponseType: string;
    requestAction: string;
    

}