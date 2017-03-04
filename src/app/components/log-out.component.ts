import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'log-out',
    templateUrl: '../views/log-out.component.html'
})
export class LogOutComponent{

    constructor(private router: Router){}

    logOut(){
        localStorage.removeItem('currentUser');
        this.router.navigate(['logIn']);
    }
}