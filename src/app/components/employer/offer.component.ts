import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OfferService } from '../../modules/http/employer.service';
import { JobPost } from '../../modules/models/job';
import { Feadback } from '../../modules/models/feadback';
import { ChatService } from '../../modules/http/chat.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: '../../views/employer/offer.component.html',
  styleUrls: ['../../styles/employer/offer.style.css']
})
export class EmployerOfferComponent extends OnInit implements AfterViewInit {
  title = 'app works!';

  postedJobs: JobPost[];

  feadbackList: Feadback[];
  constructor(private offerService: OfferService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();

    this.postedJobs = [];
    this.feadbackList = [];
  }

  ngOnInit() {
    this.offerService.getOfferListEmployerSpecific()
      .subscribe(
      (result) => {
        console.dir(result);
        this.postedJobs = result;
        //this.initJQUERY();
      },
      (err) => {
        console.dir(err);
      }
      )
  }


  ngAfterViewInit() {


  }


  private initJQUERY() {
    console.log('jquery must be there');

    $('.taboz ul li:first').addClass('active');
    $('.tab-content:not(:first)').hide();
    $('.taboz ul li a').click(function (event) {
      console.log('clicked!!!');
      event.preventDefault();
      var content = $(this).attr('href');
      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');
      $(content).show();
      $(content).siblings('.tab-content').hide();
    });
  }



  tabContentClicked(event) {

    event.preventDefault();


    var content = event.target.hash;
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    $(content).show();
    $(content).siblings('.tab-content').hide();

  }


  sendMessage(candidateId, subjectJobId) {
    console.log('send message');
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let myId = user._id;


    this.chatService.startConversation(candidateId, subjectJobId, myId)
      .subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['employer/messenger/'+response]);
        }
      },
      (err) => {
        console.dir(err);
      }
      )
  }

  confirmProposal() {
    console.log('confirmation');
  }

  declineProposal() {
    console.log('decline');
  }

  leaveFeadback(event, forJob, toClient) {
    console.log('leaving feadback');
    console.log('for ... ' + forJob);
    console.log('to client :  ' + toClient);

    console.log(event.target.elements[1].value);
    console.dir(event);

    let exists: boolean = false;
    let feadbackToSend: Feadback;
    for (let feadback of this.feadbackList) {
      if (feadback.jobId === forJob && feadback.candidateId === toClient) {
        feadback.text = event.target.elements[1].value;
        exists = true;
        console.log('feadback exists');
        feadbackToSend = feadback;
      }
    }

    if (!exists) {
      let feadback: Feadback = new Feadback();
      feadback.jobId = forJob;
      feadback.candidateId = toClient;
      feadback.text = event.target.elements[1].value;


      feadbackToSend = feadback;



      console.log('creating feadback......');
      console.dir(feadback);


      if (feadbackToSend) {
        console.log('sent.....');
      }
    }
  }

  feadbackScoreChanged(val, forJob, toClient) {
    console.log(val);
    console.log('for ... ' + forJob);
    console.log('to client :  ' + toClient);
    let exists: boolean = false;
    for (let feadback of this.feadbackList) {
      if (feadback.jobId === forJob && feadback.candidateId === toClient) {
        feadback.score = val;
        exists = true;
        console.log('feadback exists');
      }
    }

    if (!exists) {
      let feadback: Feadback = new Feadback();
      feadback.jobId = forJob;
      feadback.candidateId = toClient;
      feadback.score = val;

      this.feadbackList.push(feadback);
      console.log('creating feadback......');
      console.dir(feadback);
    }


  }
}
