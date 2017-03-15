import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Employee } from '../../modules/employeeRegistrationModel';
import { Employer } from '../../modules/employerRegistrationModel';
import { EmployerService } from '../../modules/http/visitor/employer.service';


@Component({
  selector: '',
  templateUrl: '../../views/visitor/register-employer.component.html',
  styleUrls: ['../../styles/visitor/register-employer.style.css']
})
export class RegisterEmployerComponent {
  title = 'app works!';
  employee : Employee = new Employee();
  employer : Employer = new Employer();

  constructor(private employerService: EmployerService, private router: Router){}


  onSubmit(){
    console.log('Submitted');
    console.dir(this.employee);
    console.dir(this.employer);

    this.employerService.registerEmployer(this.employer)
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
  };
}
