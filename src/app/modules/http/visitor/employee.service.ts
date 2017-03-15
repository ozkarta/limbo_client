import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Employee } from '../../employeeRegistrationModel';
import { Authentication } from './authentication.service';

@Injectable()
export class EmployeeService extends Authentication{

    

    //____________________________________________________________________

    constructor (private http1: Http){

        super(http1);
        

    }
    //____________________________________________________________________


    registerEmployee(employee: Employee): Observable<Response>{
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        
        return this.http1.post(this.genericAPI_url+'/register/employee',{ employee },options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }





    protected extractData(res: Response) {
        let body = res.json();
        console.log('data is received');
        console.dir(body);

        //this.saveUserToLocalStorage(body);

        return body.data || { };
    }

    // handleError(error: Response | any){
    //     let errMsg: string;
    //     if (error instanceof Response) {
    //         const body = error.json() || '';
    //         const err = body.error || JSON.stringify(body);
    //         errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //     } else {
    //         errMsg = error.message ? error.message : error.toString();
    //     }
    //     console.error(errMsg);
    //     return Observable.throw(errMsg);
    // }
}