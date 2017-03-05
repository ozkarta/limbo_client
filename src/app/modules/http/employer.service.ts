import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { GenericHttp } from './generic.http.service';

import { JobCategory } from '../models/job-category';
import { JobPost } from '../models/job';

import { Proposal } from '../models/proposal';
import { Candidate } from '../models/candidate';
import { Currency } from '../models/currency';
import { Duration } from '../models/duration';

@Injectable()
export class CategoryService extends GenericHttp{

    
    //categoryList: JobCategory[];

    constructor(private http: Http){
        super();
        
        //this.categoryList = [];
    }


    getCategoryList(): Observable<JobCategory[]>{
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        
        return this.http.get(this.genericAPI_url+'/category')
                        .map(this.extractData)
                        .catch(this.handleError);

    }

    private extractData(res: Response){
        console.log('response for Get Category......');
        //console.dir(res);

        let body = res.json();

        console.dir(body);
        let categoryList: JobCategory[] = [];


        for ( let cat of body.category ){
            let newCategory = new JobCategory();
            newCategory.id = cat._id;
            newCategory.categoryVarName = cat.categoryVarName;
            newCategory.type = cat.type;

            for (let subCat of cat.subCategory){
                let newSubCategory = new JobCategory();
                
                newSubCategory.id = subCat._id;
                newSubCategory.categoryVarName = subCat.categoryVarName;
                newSubCategory.type = subCat.type;

                newCategory.subCategory.push(newSubCategory);
            }
            categoryList.push(newCategory);
        }



        return categoryList;
    }

     private handleError(error: Response | any){
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

@Injectable()
export class JobService extends GenericHttp{
   
    constructor(private http: Http){
        super();
        
    }

   

    postNewJob(newJobPost: JobPost): Observable<any>{
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post(this.genericAPI_url+'/employer/job',{newJobPost},options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    updateJob(newJobPost: JobPost): Observable<JobPost>{
        let headers = new Headers({'Content-Type':'application/json'});
        
        
        let options = new RequestOptions({headers:headers});

        return this.http.post(this.genericAPI_url+'/employer/job/update',{newJobPost},options)
                        .map(this.extractDataAndCreateJob)
                        .catch(this.handleError);
    }


    getEmployerPostedJobs(): Observable<JobPost[]>{
        
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        let user = JSON.parse(localStorage.getItem('currentUser'));

        if (user){
            return this.http.post(this.genericAPI_url+'/employer/userpostedjoblist',{ owner:user._id },options)
                        .map(this.extractPostedJobsData)
                        .catch(this.handleError);
        }else{
            return Observable.throw('No User Presented');
        }
        
        
    }

    getEmployerPosterJobWithId(id: string): Observable<JobPost[]>{
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        let user = JSON.parse(localStorage.getItem('currentUser'));

        if (user){
            return this.http.post(this.genericAPI_url+'/employer/userpostedjob',{owner:user._id,jobID:id},options)
                            .map(this.extractPostedJobsData)
                            .catch(this.handleError);
        }else{
            return Observable.throw('No User Presented');
        }
        
    }

    private extractPostedJobsData(res: Response){
        let body = res.json();

        let jobList: JobPost [] = [];
        //console.dir(body);
        console.log('server responded ....');
        console.dir(body.PostList);
        if (body.PostList){
            for (let post of body.PostList){
                console.dir(post);
                let newPost: JobPost = new JobPost();

                newPost.id = post._id;
                newPost.jobCategory = post.jobCategory;
                newPost.jobSubCategory = post.jobSubCategory;
                newPost.owner = post.owner;
                newPost.jobTitle = post.jobTitle;
                newPost.jobDescription = post.jobDescription;
                newPost.deadline = post.deadLine;
                newPost.budget = post.budget;
                newPost.paymentType = post.paymentType;
                newPost.projectType = post.projectType;
                newPost.status = post.status;
                newPost.requirements = post.requirements;
                newPost.candidates = post.candidates;
                newPost.imageURLList = post.imageURLList;
                newPost.atachmentList = post.atachmentList;
                newPost.currency = post.currency;

                newPost.createdAt = post.createdAt;
                newPost.updatedAt = post.updatedAt;

                jobList.push(newPost);
            }
            console.dir(jobList);
            return jobList;
        }else{
            console.log('!!!!!!!!');
            return null;
        }
    }
    extractDataAndCreateJob(res: Response){
        let body = res.json();

        console.dir(body);
        if (body.post){
             let newPost: JobPost = new JobPost();

                newPost.id = body.post._id;
                newPost.jobCategory = body.post.jobCategory;
                newPost.jobSubCategory = body.post.jobSubCategory;
                newPost.owner = body.post.owner;
                newPost.jobTitle = body.post.jobTitle;
                newPost.jobDescription = body.post.jobDescription;
                newPost.deadline = body.post.deadLine;
                newPost.budget = body.post.budget;
                newPost.paymentType = body.post.paymentType;
                newPost.projectType = body.post.projectType;
                newPost.status = body.post.status;
                newPost.requirements = body.post.requirements;
                newPost.candidates = body.post.candidates;
                newPost.imageURLList = body.post.imageURLList;
                newPost.atachmentList = body.post.atachmentList;
                newPost.currency = body.post.currency;

                newPost.createdAt = body.post.createdAt;
                newPost.updatedAt = body.post.updatedAt;

                console.dir(newPost);
                return newPost;
        }
        return null;
    }

     private extractData(res: Response){
        return res.json();
     }  

    private handleError(error: Response | any){
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

@Injectable()
export class OfferService extends GenericHttp{
    

    constructor(private http: Http){
        super();
        
    }


    getOfferListEmployerSpecific(): Observable<JobPost[]>{
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         let user =JSON.parse(localStorage.getItem('currentUser'));


         return this.http.post(this.genericAPI_url + '/employer/offers',{user},options)
            .map(this.getOfferListEmployerSpecificExtractor)
            .catch(this.handleError);
    }

    private getOfferListEmployerSpecificExtractor(res: Response){
        let body = res.json();
        console.dir(body);
        let jobArray : JobPost [] = [];

        if(body.result){
            for(let job of body.result){
                let j: JobPost = new JobPost();

                j.id = job._id;
                j.jobCategory = job.jobCategory;
                j.jobSubCategory = job.jobSubCategory;
                j.owner = job.owner;
                j.jobTitle = job.jobTitle;
                j.jobDescription = job.jobDescription;
                j.deadline = job.deadLine;
                j.budget = job.budget;
                j.paymentType = job.paymentType;
                j.projectType = job.projectType;
                j.status = job.status;
                j.requirements = job.requirements;
                j.candidates = job.candidates;
                j.imageURLList = job.imageURLList;
                j.atachmentList = job.atachmentList;
                j.currency = job.currency;

                j.createdAt = job.createdAt;
                j.updatedAt = job.updatedAt;
                

                for(let proposal of job.proposals){
                    let p = new Proposal();

                    
                    p.id = proposal._id;
                    p.hostJobID = job._id;

                    if (proposal.candidate){

                        p.candidate.id = proposal.candidate._id;
                        p.candidate.contactPhone =  proposal.candidate.contactPhone;
                        p.candidate.createdAt =  proposal.candidate.createdAt;
                        p.candidate.updatedAt =  proposal.candidate.updatedAt;

                        p.candidate.userName = proposal.candidate.userName;
                        p.candidate.email = proposal.candidate.email;
                        p.candidate.fName = proposal.candidate.fName;
                        p.candidate.lName = proposal.candidate.lName;
                        p.candidate.userRole = proposal.candidate.userRole;
                        p.candidate.feadback = proposal.candidate.feadback;
                        
                        p.candidate.portfolio = proposal.candidate.portfolio;
                        p.candidate.services = proposal.candidate.services;
                        p.candidate.subscribes = proposal.candidate.subscribes;
                        p.candidate.subscribers = proposal.candidate.subscribers;
                    }
                    p.price = proposal.price;
                    

                    if(proposal.currency){
                        p.currency.id = proposal.currency._id;
                        p.currency.country = proposal.currency.country;
                        p.currency.currency = proposal.currency.currency;
                        p.currency.currencySymbol = proposal.currency.currencySymbol;
                    }
                    if(proposal.duration){
                        p.duration.id = proposal.duration._id;
                        p.duration.duration = proposal.duration.duration;
                        p.duration.durationValue = proposal.duration.durationValue;
                    }
                    p.coverLetter = proposal.coverLetter;
                    p.whyToChoose = proposal.whyToChoose;
                    p.offerStatus = proposal.offerStatus;

                    j.proposals.push(p);
                }

                jobArray.push(j);

                
            }

            return jobArray;


        }else{
            return null;
        }
        

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