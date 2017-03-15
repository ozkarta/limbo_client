export class ServerResponse{

    type: string;
    status: string;
    message: string;
    data: any[];
    dataType: string;
    sender: string;
    constructor(){

        this.type = '';
        this.status = '';
        this.message = '';
        this.data = [];
        this.dataType = '';
        this.sender = '';
    }
}