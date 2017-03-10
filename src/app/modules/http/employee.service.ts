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


 //_________________________________________________________________________________________


    getProposedJobs(): Observable <any>{
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         let user = this.getUser();
          return this.http.post(this.genericAPI_url + '/employee/history/proposed',{user:user._id},options)
            .map(this.getProposedJobsMapper)
            .catch(this.handleError);
    }
    private getProposedJobsMapper(res: Response){
        let body = res.json();


        return body;
    }   

    getDeclinedJobs(): Observable <any>{
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         let user = this.getUser();
          return this.http.post(this.genericAPI_url + '/employee/history/declined',{user:user._id},options)
            .map(this.getDeclinedJobsMapper)
            .catch(this.handleError);
    }
    private getDeclinedJobsMapper(res: Response){
        let body = res.json();

        
        return body;
    }

   getInterviewingJobs(): Observable <any>{
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         let user = this.getUser();
          return this.http.post(this.genericAPI_url + '/employee/history/interviewing',{user:user._id},options)
            .map(this.getInterviewingJobsMapper)
            .catch(this.handleError);
    }
    private getInterviewingJobsMapper(res: Response){
        let body = res.json();

        
        return body;
    }

    getAcceptedJobs(): Observable <any>{
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         let user = this.getUser();
          return this.http.post(this.genericAPI_url + '/employee/history/accepted',{user:user._id},options)
            .map(this.getAcceptedJobsMapper)
            .catch(this.handleError);
    }
    private getAcceptedJobsMapper(res: Response){
        let body = res.json();

        
        return body;
    }

    getWithdrawedJobs(): Observable <any>{
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         let user = this.getUser();
          return this.http.post(this.genericAPI_url + '/employee/history/withdrawed',{user:user._id},options)
            .map(this.getWithdrawedJobsMapper)
            .catch(this.handleError);
    }
    private getWithdrawedJobsMapper(res: Response){
        let body = res.json();

        
        return body;
    }
    
    getFinishedJobs(): Observable <any>{
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         let user = this.getUser();
          return this.http.post(this.genericAPI_url + '/employee/history/finished',{user:user._id},options)
            .map(this.getFinishedJobsMapper)
            .catch(this.handleError);
    }
    private getFinishedJobsMapper(res: Response){
        let body = res.json();

        
        return body;
    }

    getFeadback(): Observable <any>{
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         let user = this.getUser();
          return this.http.post(this.genericAPI_url + '/employee/history/feadback',{user:user._id},options)
            .map(this.getFeadbackMapper)
            .catch(this.handleError);
    }
    private getFeadbackMapper(res: Response){
        let body = res.json();

        
        return body;
    }

    


   //_________________________________________________________________________________________


    private getUser(){
        let user = JSON.parse(localStorage.getItem('currentUser'));

        return user;
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