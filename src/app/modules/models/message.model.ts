export class Message{
    id: string;
    senderID: string;
    createdAt: string;
    updatedAt: string;
    text: string;
    seenBy:string[];
    deliveredAt: string;
    seenAt: string;
}