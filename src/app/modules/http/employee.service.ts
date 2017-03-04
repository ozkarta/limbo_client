import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { GenericHttp } from './generic.http.service';

import { Proposal } from '../models/proposal';
import { Duration } from '../models/duration';
import { Currency } from '../models/currency';
import { GenericService } from '../http/generic.service';


@Injectable()
export class EmployeeJobService extends GenericHttp{
    

    constructor(private http: Http){
        super();
        
    }


    sendProposal(proposal: Proposal): Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this.http.post(this.genericAPI_url + '/employee/sendproposal',{proposal},options)
            .map(this.afterSendProposal)
            .catch(this.handleError);
    }

    private afterSendProposal(res: Response){

        let body = res.json();
        console.log('response arrived...');
        console.dir(body);
        return null;
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