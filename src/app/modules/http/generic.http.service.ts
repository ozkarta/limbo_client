export class GenericHttp{

    httpProtocol: string;
    httpsProtocol: string;
    wsProtocol: string;

    serverIP: string;
    serverPort: string;
    server: string;
    
    genericAPI_url: string;
    genericWS_url: string;     

    constructor(){

        this.httpProtocol = 'http:';
        this.httpsProtocol = 'https:';
        this.wsProtocol = 'ws:';

        
        //this.serverIP = 'geolimgo.herokuapp.com';
        this.serverIP = 'localhost:3311';

        this.serverPort = '3311';

        this.server = this.serverIP //+ ':' + this.serverPort;

        this.genericAPI_url = this.httpProtocol+'//'+ this.server + '/api';

        this.genericWS_url = this.wsProtocol + '//' + this.server;
    }
}