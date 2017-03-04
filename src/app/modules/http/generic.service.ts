import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { GenericHttp } from './generic.http.service';

import { JobCategory } from '../models/job-category';
import { JobPost } from '../models/job';
import { SearchModel } from '../models/search.model';

import { Duration } from '../models/duration';
import { Currency } from '../models/currency';



@Injectable()
export class GenericService extends GenericHttp{
    


    constructor(private http: Http) {
        super();

        

        
    }



    getCategoryList(): Observable<JobCategory[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.genericAPI_url + '/category')
            .map(this.extractData)
            .catch(this.handleError);

    }
    private extractData(res: Response) {
        console.log('response for Get Category......');
        //console.dir(res);

        let body = res.json();

        console.dir(body);
        let categoryList: JobCategory[] = [];


        for (let cat of body.category) {
            let newCategory = new JobCategory();
            newCategory.id = cat._id;
            newCategory.categoryVarName = cat.categoryVarName;
            newCategory.type = cat.type;

            for (let subCat of cat.subCategory) {
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

    getDurationList(): Observable<Duration[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.genericAPI_url + '/duration')
            .map(this.extractDurationData)
            .catch(this.handleError);
    }
    extractDurationData(res: Response){
        let body = res.json();

        let durList: Duration[] = [];

        if(body.duration){
            for(let dur of body.duration){
                let duration: Duration = new Duration();
                duration.id = dur._id;
                duration.duration = dur.duration;
                duration.durationValue = dur.durationValue;

                durList.push(duration)
            }            
        }
        return durList;
        
        
    }
    getCurrencyList(): Observable<Currency[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.genericAPI_url + '/currency')
            .map(this.extractCurrencyData)
            .catch(this.handleError);
    }
    extractCurrencyData(res: Response){
        let body = res.json();

        let curList:Currency[] = [];

        if (body.currency){
            for(let cur of body.currency){
                let currency = new Currency();
                currency.id = cur._id;
                currency.country = cur.country;
                currency.currency = cur.currency;
                currency.country = cur.country;

                curList.push(currency);
            }
        }
        return curList;
    }

    searchForJob(search: SearchModel): Observable<JobPost[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.genericAPI_url + '/employer/searchresult', { search }, options)
            .map(this.extractSearchData)
            .catch(this.handleError);
    }
    extractSearchData(res: Response) {
        console.dir(res.json());

        let body = res.json();
        let jobArray: JobPost[] = [];

        if (body.searchResult) {
            for (let bob of body.searchResult) {

                if (bob) {
                    let newJob = new JobPost();
                    newJob.id = bob._id;
                    newJob.createdAt = bob.createdAt;
                    newJob.updatedAt = bob.updatedAt;
                    newJob.deadline = bob.deadLine;
                    newJob.jobTitle = bob.jobTitle;
                    newJob.jobDescription = bob.jobDescription;
                    newJob.paymentType = bob.paymentType;
                    newJob.projectType = bob.projectType;

                    jobArray.push(newJob);
                }

            }

            return jobArray;
        } else {
            return jobArray;
        }

    }

    getJobWithID(id):Observable<JobPost>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.genericAPI_url + '/job/'+id)
            .map(this.getJobWithIDExtractor)
            .catch(this.handleError);
    }

    private getJobWithIDExtractor(res: Response){
        
        console.dir(res);
        let body = res.json();
        console.dir(body);
        let job = new JobPost();

        if (body.result){
            job.id = body.result._id;
            job.jobCategory = body.result.jobCategory;
            job.jobSubCategory = body.result.jobSubCategory;
            job.owner = body.result.owner;
            job.jobTitle = body.result.jobTitle;
            job.jobDescription = body.result.jobDescription;
            job.deadline = body.result.deadLine;
            job.budget = body.result.budget;
            job.paymentType = body.result.paymentType;
            job.projectType = body.result.projectType;
            job.status = body.result.status;
            job.requirements = body.result.requirements;
            job.candidates = body.result.candidates;
            job.imageURLList = body.result.imageURLList;
            job.atachmentList = body.result.atachmentList;

            job.currency = body.result.currency;
            job.createdAt = body.result.createdAt;
            job.updatedAt = body.result.updatedAt;

            for(let proposer of body.result.proposals){
                job.proposals.push(proposer.candidate);
            }
             
        }

        return job;
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