import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';



@Injectable()
export class VisitorGuard implements CanActivate {


    constructor(private router: Router){}

    canActivate() {
        console.log('visitor Guard');
        let user = JSON.parse(localStorage.getItem('currentUser'));
        console.dir(user);

        if (!user){
            return true;
        }

        if (user.userRole === 'employer'){
            this.router.navigate(['employer']);
            return false;
        }

        if (user.userRole === 'employee'){
            this.router.navigate(['employee']);
            return false;
        }

        if (user.userRole === 'administration'){
            this.router.navigate(['administration']);
            return false;
        }
        
        //  case when  user exists  but  user role not presented
        this.router.navigate(['notFound']);
        return false;
    }

}