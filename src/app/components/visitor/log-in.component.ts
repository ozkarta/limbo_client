import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Authentication } from '../../modules/http/visitor/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: '../../views/visitor/log-in.component.html',
  styleUrls: ['../../styles/visitor/log-in.style.css']
})
export class LogInComponent {
  title = 'app works!';

  constructor(private auth: Authentication,private router: Router){}

  onSubmitLocalAuth(){
    console.log('Log In Request');
    console.log(this.auth.userName);
    console.log(this.auth.password);

    this.auth.logIn()
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
}
