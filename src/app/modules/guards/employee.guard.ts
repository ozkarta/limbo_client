import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class EmployeeGuard implements CanActivate {


    constructor(private router: Router){}

    canActivate() {
        console.log('employee Guard');
        let user =JSON.parse(localStorage.getItem('currentUser'));
        
        
         if (user){

            if (user.userRole){

                if (user.userRole.toString() === 'employee'){
                    console.log('employee');
                    return true
                }

                // case when  user role  does not match
                this.router.navigate(['logIn']);
                return false;
            }
            
            //  Case when user exists but user role is not presented
            this.router.navigate(['notFound']);
            return false;
        }

        //  Case when unauthorized request
        console.log('no user');
        this.router.navigate(['logIn']);
        return false;
        
    }

}