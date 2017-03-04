import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {


    constructor(private router: Router){}

    canActivate() {
        let user =JSON.parse(localStorage.getItem('currentUser'));
        if (user){
            if (user.userRole){
                if (user.userRole === 'admin'){
                    return true
                }
                return false;
            }
            return false;
        }
        return false;
        
    }

}