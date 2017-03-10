import { Component, OnInit } from '@angular/core';
import { EmployeeJobService } from '../../modules/http/employee.service';
import * as $ from 'jquery';


import { ProposalHistory } from '../../modules/models/proposal-hystory';

@Component({
  selector: 'app-root',
  templateUrl: '../../views/employee/history.component.html',
  styleUrls: ['../../styles/employee/history.style.css']
})
export class EmployeeHistoryComponent implements OnInit {
  title = 'app works!';

  proposedArray: ProposalHistory [];
  declinedArray: ProposalHistory [];
  interviewingArray: ProposalHistory [];
  acceptedArray: ProposalHistory [];
  withdrawedArray: ProposalHistory [];
  finishedArray: ProposalHistory [];



  constructor(private employeeService: EmployeeJobService) {
    
    this.proposedArray = [];
    this.declinedArray = [];
    this.interviewingArray = [];
    this.acceptedArray = [];
    this.withdrawedArray = [];
    this.finishedArray = [];

  }

  ngOnInit() {

    this.defaultAPICalls();

    $(document).ready(function () {
      $('.taboz ul li:first').addClass('active');
      $('.tab-content:not(:first)').hide();
      $('.taboz ul li a').click(function (event) {
        event.preventDefault();
        var content = $(this).attr('href');
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        $(content).show();
        $(content).siblings('.tab-content').hide();
      });
    });


  }
  //____________________________________________


  //____________________________________________
  private defaultAPICalls() {

    this.employeeService.getProposedJobs()
      .subscribe(
      (result) => {
        console.log('proposed');
        console.dir(result);
        if(result.status ==='200' || result.status === 200 ){
          for(let job of result.jobs){
            let proposed = new ProposalHistory();


            proposed.budget = job.budget;
            proposed.createdAt = job.proposals[0].createdAt;
            proposed.currency = job.proposals[0].currency;
            proposed.deadline = job.deadLine;
            proposed.duration = job.proposals[0].duration;
            proposed.jobID = job._id;
            proposed.jobTitle = job.jobTitle;
            proposed.price = job.proposals[0].price;

            this.proposedArray.push(proposed);
          }
        }

        
        
      },
      (err) => {
        console.dir(err)
      }
      );

    this.employeeService.getDeclinedJobs()
      .subscribe(
      (result) => {
        console.log('declined');
        console.dir(result);

        if(result.status ==='200' || result.status === 200 ){
          for(let job of result.jobs){
            let declined = new ProposalHistory();


            declined.budget = job.budget;
            declined.createdAt = job.proposals[0].createdAt;
            declined.currency = job.proposals[0].currency;
            declined.deadline = job.deadLine;
            declined.duration = job.proposals[0].duration;
            declined.jobID = job._id;
            declined.jobTitle = job.jobTitle;
            declined.price = job.proposals[0].price;

            this.declinedArray.push(declined);
          }
        }
      },
      (err) => {
        console.dir(err)
      }
      );

    this.employeeService.getInterviewingJobs()
      .subscribe(
      (result) => {
        console.log('interviewing');
        console.dir(result);

        if(result.status ==='200' || result.status === 200 ){
          for(let job of result.jobs){
            let interviewing = new ProposalHistory();


            interviewing.budget = job.budget;
            interviewing.createdAt = job.proposals[0].createdAt;
            interviewing.currency = job.proposals[0].currency;
            interviewing.deadline = job.deadLine;
            interviewing.duration = job.proposals[0].duration;
            interviewing.jobID = job._id;
            interviewing.jobTitle = job.jobTitle;
            interviewing.price = job.proposals[0].price;

            this.interviewingArray.push(interviewing);
          }
        }
      },
      (err) => {
        console.dir(err)
      }
      );

    this.employeeService.getAcceptedJobs()
      .subscribe(
      (result) => {
        console.log('accepted');
        console.dir(result);

        if(result.status ==='200' || result.status === 200 ){
          for(let job of result.jobs){
            let accepted = new ProposalHistory();


            accepted.budget = job.budget;
            accepted.createdAt = job.proposals[0].createdAt;
            accepted.currency = job.proposals[0].currency;
            accepted.deadline = job.deadLine;
            accepted.duration = job.proposals[0].duration;
            accepted.jobID = job._id;
            accepted.jobTitle = job.jobTitle;
            accepted.price = job.proposals[0].price;

            this.acceptedArray.push(accepted);
          }
        }
      },
      (err) => {
        console.dir(err)
      }
      );

    this.employeeService.getWithdrawedJobs()
      .subscribe(
      (result) => {
        console.log('withdrawed');
        console.dir(result);
        if(result.status ==='200' || result.status === 200 ){
          for(let job of result.jobs){
            let withdrawed = new ProposalHistory();


            withdrawed.budget = job.budget;
            withdrawed.createdAt = job.proposals[0].createdAt;
            withdrawed.currency = job.proposals[0].currency;
            withdrawed.deadline = job.deadLine;
            withdrawed.duration = job.proposals[0].duration;
            withdrawed.jobID = job._id;
            withdrawed.jobTitle = job.jobTitle;
            withdrawed.price = job.proposals[0].price;

            this.withdrawedArray.push(withdrawed);
          }
        }
      },
      (err) => {
        console.dir(err)
      }
      );

    this.employeeService.getFinishedJobs()
      .subscribe(
      (result) => {
        console.log('finished');
        console.dir(result);

        if(result.status ==='200' || result.status === 200 ){
          for(let job of result.jobs){
            let finished = new ProposalHistory();


            finished.budget = job.budget;
            finished.createdAt = job.proposals[0].createdAt;
            finished.currency = job.proposals[0].currency;
            finished.deadline = job.deadLine;
            finished.duration = job.proposals[0].duration;
            finished.jobID = job._id;
            finished.jobTitle = job.jobTitle;
            finished.price = job.proposals[0].price;

            this.finishedArray.push(finished);
          }
        }
      },
      (err) => {
        console.dir(err)
      }
      );

    this.employeeService.getFeadback()
      .subscribe(
      (result) => {
        console.log('feadback');
        console.dir(result);
      },
      (err) => {
        console.dir(err)
      }
      );

  }


}
