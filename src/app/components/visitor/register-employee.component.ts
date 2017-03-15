import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Employee,Individual,Company } from '../../modules/employeeRegistrationModel';
//import { Employer } from '../modules/employerRegistrationModel';
import { EmployeeService } from '../../modules/http/visitor/employee.service';

@Component({
  selector: '',
  templateUrl: '../../views/visitor/register-employee.component.html',
  styleUrls: ['../../styles/visitor/register-employee.style.css']
})
export class RegisterEmployeeComponent {
  title = 'app works!';
  //employee : Employee = new Employee();

  company: Company = new Company();
  individual: Individual = new Individual(); 

  

  constructor(private employeeService: EmployeeService, private router: Router){}


  onSubmitIndividual(){
    console.log('Submitted individual');
    console.dir(this.individual);

    this.employeeService.registerEmployee(this.individual)
                        .subscribe(
                          res => {
                            console.log('redirecting....');
                            console.dir(res);
                            this.router.navigate(['']);
                          },
                          err => {
                            console.dir(err);
                          }
                        );
  }
  onSubmitCompany(){
    console.log('submitted company');
    console.dir(this.company);

    this.employeeService.registerEmployee(this.company)
                        .subscribe(
                          res => {
                            console.dir(res);
                          },
                          err => {
                            console.dir(err);
                          }
                        );
  }
}
