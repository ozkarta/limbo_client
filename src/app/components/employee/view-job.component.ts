import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as $ from 'jquery';

import { Proposal } from '../../modules/models/proposal';
import { Duration } from '../../modules/models/duration';
import { Currency } from '../../modules/models/currency';
import { GenericService } from '../../modules/http/generic.service';
import { EmployeeJobService } from '../../modules/http/employee.service';
import { JobPost } from '../../modules/models/job'

@Component({
    selector: 'app-root',
    templateUrl: '../../views/employee/view-job.component.html',
    styleUrls: ['../../styles/employee/view-job.style.css']
})
export class EmployeeViewWJobComponent  extends OnInit implements AfterViewInit{
    title = 'app works!';

    jobPost: JobPost;
    proposal: Proposal;
    currencyList: Currency[];
    durationList: Duration[];
    id: string;
    alreadyApplied: boolean;
    applyVisibility: {};
    changeApplyVisibility: {};
    constructor(private genericService: GenericService, 
                private employeeJobService: EmployeeJobService,
                private route: ActivatedRoute,
                private router: Router){
        super();

        this.proposal = new Proposal();
        console.dir(this.proposal);


        this.currencyList =[];
        this.durationList = [];

        this.id = this.route.snapshot.params['id'];
        this.jobPost = new JobPost();
        this.alreadyApplied = false;
        this.applyVisibility = {'':''};
        this.changeApplyVisibility = {'display':'none'};
        
    }

    ngAfterViewInit() {
        this.addJQUERY();
        
    }

    ngOnInit(){
        this.genericService.getCurrencyList()
            .subscribe(
                (cur) =>{
                    
                    this.currencyList = cur;
                    console.dir(this.currencyList);
                    this.proposal.currency = new Currency();
                    this.proposal.currency.id = this.currencyList[0].id;
                    
                   },
                (err) =>{
                    console.dir(err);
                }
            );

        this.genericService.getDurationList()
            .subscribe(
                (dur) =>{
                    console.dir(dur);
                    this.durationList = dur;
                    this.proposal.duration = new Duration();
                    this.proposal.duration.id = this.durationList[0].id;
                    
                },
                (err) =>{
                    console.dir(err);
                }
            );

        this.genericService.getJobWithID(this.id)
            .subscribe(
                (res) =>{
                    console.dir(res);
                    this.jobPost = res;
                    this.checkIfProposalSent(this.jobPost);
                },
                (err) =>{
                    console.dir(err);
                }
            )

    }


    sendProposal(){
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.proposal.candidate.id = user._id;
        this.proposal.hostJobID = this.jobPost.id;


        console.log('proposal sent');
        
        console.dir(this.proposal);

        this.employeeJobService.sendProposal(this.proposal)
            .subscribe(
                (result) =>{
                    console.dir(result);
                },
                (err) =>{
                    console.dir(err);
                }
            )
    }

    durationChanged(val){
        console.log(val);
        if(val){
            this.proposal.duration = val;
        }
    }
    currencyChanged(val){
        console.log(val);
        if(val){
            this.proposal.currency = val;
        }
    }


    private checkIfProposalSent(job: JobPost){
        let user = JSON.parse(localStorage.getItem('currentUser'));

        for(let proposal of job.proposals){
            console.log(proposal+' VS '+user._id);
            if(proposal === user._id){
                this.alreadyApplied = true;

                this.applyVisibility = {'display':'none'};
                this.changeApplyVisibility = {'':''};
                
                console.log('already applied!!!');
            }
        }
    }


    addJQUERY(){
        console.log('jquery must be there');

        $('.taboz ul li:first').addClass('active');
        $('.tab-content:not(:first)').hide();
        $('.taboz ul li a').click(function (event) {
            console.log('clicked');
            event.preventDefault();
            var content = $(this).attr('href');
            console.dir(content);
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
            $(content).show();
            $(content).siblings('.tab-content').hide();
        });
    }
}
