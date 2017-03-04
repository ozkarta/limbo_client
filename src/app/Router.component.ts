import { RouterModule } from '@angular/router';
import { Injectable } from '@angular/core';


import { AppComponent } from './app.component';
//  Visitor
import { AboutUsComponent } from  './components/visitor/about-us.component';
import { HomeComponent } from  './components/visitor/home.component';
import { LogInComponent } from  './components/visitor/log-in.component';
import { SignUpComponent } from  './components/visitor/sign-up.component';

import { VisitorNavbarComponent } from  './components/visitor/visitor-navbar.component';
import { EmployeeNavbarComponent } from  './components/employee/employee-navbar.component';
import { EmployerNavbarComponent } from  './components/employer/employer-navbar.component';

import { RegisterEmployeeComponent } from  './components/visitor/register-employee.component';
import { RegisterEmployerComponent } from  './components/visitor/register-employer.component';

import { EmployerService } from './modules/http/visitor/employer.service';
import { EmployeeService } from './modules/http/visitor/employee.service';
//Employer 
import { EmployerHomeComponent } from  './components/employer/home-component'

import { EmployerAccountComponent } from  './components/employer/account.component';
//++++++++++++++++++++++
import { EmployerAccountPersonalInfoComponent } from './components/employer/account/personal-info';
import { EmployerAccountAddressComponent } from './components/employer/account/address';
import { EmployerAccountAssotiationComponent } from './components/employer/account/assotiation';
import { EmployerAccountChangePasswordComponent } from './components/employer/account/change-password';
import { EmployerAccountDeactivationComponent } from './components/employer/account/deactivation';
//______________________
import { EmployerJobHistoryComponent } from  './components/employer/job-history.component';
import { EmployerMessengerComponent } from  './components/employer/messenger.component';
import { EmployerPostJobComponent } from  './components/employer/post-job.component';
import { EmployerSubscribeComponent } from  './components/employer/subscribe.component';
import { EmployerOfferComponent } from  './components/employer/offer.component';
import { EditJobComponent } from  './components/employer/edit-job.component';
//Employee
import { EmployeeHomeComponent } from './components/employee/home-component';
import { EmployeeAccountComponent } from './components/employee/account.component';

import { EmployeeHistoryComponent } from './components/employee/history.component';
import { EmployeeMessengerComponent } from './components/employee/messenger.component';
import { EmployeeSubscribeComponent } from './components/employee/subscribe.component';
import { EmployeeTopWorkerComponent } from './components/employee/top-workers.component';
import { EmployeeViewWJobComponent } from './components/employee/view-job.component';
// Guards
import { AdminGuard } from './modules/guards/admin.guard'
import { EmployeeGuard } from './modules/guards/employee.guard'
import { EmployerGuard } from './modules/guards/employer.guard'
import { VisitorGuard } from './modules/guards/visitor.guard'



import { NgModule }             from '@angular/core';
import {  Routes } from '@angular/router';
const routes: Routes = [
            {
                path: '',
                component: HomeComponent,
                canActivate: [VisitorGuard]
            },
            {
                path: 'aboutUs',
                component: AboutUsComponent
            },
            {
                path: 'logIn',
                component: LogInComponent
            },
            {
                path: 'signUp',
                component: SignUpComponent
            },
            {
                path: 'registerEmployer',
                component: RegisterEmployerComponent
            },
            {
                path: 'registerEmployee',
                component: RegisterEmployeeComponent
            },
            //  Employer Routes
            {
                path: 'employer',
                component: EmployerHomeComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/postJob',
                component: EmployerPostJobComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/clientJobHistory',
                component: EmployerJobHistoryComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/edit-job/:id',
                component: EditJobComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/subscribes',
                component: EmployerSubscribeComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/messenger',
                component: EmployerMessengerComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/messenger/:id',
                component: EmployerMessengerComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/offers',
                component: EmployerOfferComponent,
                canActivate: [EmployerGuard]
            },
            {
                path: 'employer/account',
                component: EmployerAccountComponent,
                canActivate: [EmployerGuard],
                children: [
                            { path: '',
                              component: EmployerAccountPersonalInfoComponent,
                              outlet: 'account',
                              pathMatch: 'full'  },
                            { path: 'addresses',
                              component: EmployerAccountAddressComponent,
                              outlet: 'account' },
                            { path: 'assotiation',
                              component: EmployerAccountAssotiationComponent,
                              outlet: 'account' },
                            { path: 'changepassword',
                              component: EmployerAccountChangePasswordComponent,
                              outlet: 'account' },
                            { path: 'deactivation',
                              component: EmployerAccountDeactivationComponent,
                              outlet: 'account' }
                    ]
            },
            // Employee Routes
            {
                path: 'employee',
                component: EmployeeHomeComponent,
                canActivate: [EmployeeGuard]
            },
            {
                path: 'employee/history',
                component: EmployeeHistoryComponent,
                canActivate: [EmployeeGuard]
            },
            {
                path: 'employee/messenger',
                component: EmployeeMessengerComponent,
                canActivate: [EmployeeGuard]
            },
            {
                path: 'employee/account',
                component: EmployeeAccountComponent,
                canActivate: [EmployeeGuard]
            },
            {
                path: 'employee/topworker',
                component: EmployeeTopWorkerComponent,
                canActivate: [EmployeeGuard]
            },
            {
                path: 'employee/subscribes',
                component: EmployeeSubscribeComponent,
                canActivate: [EmployeeGuard]
            },
            {
                path: 'employee/viewjob/:jobName/:id',
                component: EmployeeViewWJobComponent,
                canActivate: [EmployeeGuard]
            }

            // Admin Routes
            
        ];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouter {}