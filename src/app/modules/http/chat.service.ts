import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { WebSocketService } from './web-socket.service';

import { GenericHttp } from './generic.http.service';

// import { Conversation } from '../models/conversation.model';
// import { ConversationUser } from '../models/conversation-user.model';
// import { Message } from '../models/message.model';


import { ServerResponse } from '../models/ws_models/server.response.model';
import { ServerRequest } from '../models/ws_models/server.request.model';


@Injectable()
export class ChatService extends GenericHttp{
    public ws: Subject<ServerResponse>;
    private result: string;
    connected: boolean;
    connectionStatus: string;
    // private request: Conversation;
    // private me: ConversationUser;
    // public conversation: Conversation[];

    

    constructor(private weService: WebSocketService, private http: Http) {
        super();
        this.connected = false;
        

        // this.conversation = [];
        // this.genericAPI_url = 'http://localhost:3311/';
        // this.request = {
        //     id: '',
        //     me: null,
        //     chatters: [],
        //     subject: '',
        //     messages: [],
        //     lastResponseType: '',
        //     requestAction: ''
        // };
        // this.me = new ConversationUser();

        this.ws = <Subject<ServerResponse>>this.weService.connect(this.genericWS_url+'?token='+this.getMyId())
            .map((response: MessageEvent): ServerResponse => {

                this.connected = true;

                let serverResponseJSON = JSON.parse(response.data);
                console.log('data received');
                console.dir(serverResponseJSON);
                // Check if  server responded correctly with JSON
                if (!serverResponseJSON) {
                    return null;
                }

                if (serverResponseJSON.type === 'handshake') {
                    let serverResponse = new ServerResponse();
                    serverResponse.type = 'handshake';


                    return serverResponse;
                }

                if (serverResponseJSON.type === 'GET') {
                    let serverResponse = new ServerResponse();
                    serverResponse.type = 'GET';
                    serverResponse.status = serverResponseJSON.status;
                    serverResponse.message = serverResponseJSON.message;
                    serverResponse.data = serverResponseJSON.data;
                    serverResponse.dataType = serverResponseJSON.dataType;

                    return serverResponse;
                }

                if (serverResponseJSON.type === 'UpdateMessage'){
                    let serverResponse = new ServerResponse();
                    serverResponse.type = serverResponseJSON.type;
                    serverResponse.status = serverResponseJSON.status;
                    serverResponse.message = serverResponseJSON.message;
                    serverResponse.data = serverResponseJSON.data;
                    serverResponse.dataType = serverResponseJSON.dataType;

                    return serverResponse;
                }


            });

        this.ws.subscribe(
            (response) => {
                console.log('global subscribe');
            }
        )
    }

    getConversationList() {
        console.log('Requesting Conversation List.....');
        let request = new ServerResponse();
        request.type = 'GetConversationList';
        request.sender = this.getMyId();

        this.ws.next(request);

    }

    private getMyId() {

        if (localStorage.getItem('currentUser')) {
            let user = JSON.parse(localStorage.getItem('currentUser'));

            if (!user) {
                return '';
            }
            if (!user._id) {
                return '';
            }
            return user._id;
        } else {
            return '';
        }


    }

    // private initializeMe() {
    //     let user = JSON.parse(localStorage.getItem('currentUser'));
    //     if (user) {
    //         this.me.fName = user.fName;
    //         this.me.lName = user.lName;
    //         this.me.id = user._id;
    //         this.me.status = '';
    //     } else {
    //         // Router.redirect
    //     }
    // }


    public startConversation(candidateId, subjectJobId, senderId): Observable<any> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.genericAPI_url + '/messenger/startconversation',
            { candidate: candidateId, subjectJob: subjectJobId, sender: senderId },
            options)
            .map(this.startConversationDataExtractor)
            .catch(this.handleError);

    }

    private startConversationDataExtractor(res: Response) {

        let body = res.json();

        let conversationId: string = '';
        if (body.conversation) {
            conversationId = body.conversation.conversationId;
        }

        return conversationId;
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}

