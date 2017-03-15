import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { GenericHttp } from '../generic.http.service';
@Injectable()
export class Authentication extends GenericHttp{
    

    userName: String;
    password: String;
    
    self: Authentication;
        
        
    //____________________________________________________________
    constructor(private http: Http){
        super();

        
        this.self = this;
    }
    //____________________________________________________________
        
    logIn(): Observable< Response >{
        if(this.userName && this.password){
            let headers = new Headers({'Content-Type':'application/json'});
            let options = new RequestOptions({headers:headers});


            return this.http.post(this.genericAPI_url+'/logIn',{ userName:this.userName,password:this.password },options)
                        .map(this.extractData)
                        .catch(this.handleError);
        }else{
            console.log('!!!!!!!!!!!!');
            //return this.customError('User Or Password is empty');
        }
    }

     logOut(){
        localStorage.removeItem('currentUser');
    }
    


    protected extractData(res: Response){
        let body = res.json();


        //console.log(this);
        console.log('data is received');
        console.dir(JSON.stringify(body));

        if(body.user){
            localStorage.setItem('currentUser',JSON.stringify(body.user));
        }
        




        //console.dir(JSON.parse(localStorage.getItem('currentUser')));


        return body || { };
    }

    handleError(error: Response | any){
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

    customError(err){
        //return Observable.throw(err);
        return null;
    }



   
    // Save user to local sorage
    protected saveUserToLocalStorage(user: string){
        //localStorage.setItem('currentUser',user);
        return true;
    }
    protected myFunction(){
        console.log('invoked');
    }


}