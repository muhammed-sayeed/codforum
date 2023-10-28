import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { LoginComponent } from '../../../featureModule/user/components/login/login.component';
import { userServices } from 'src/app/featureModule/user/service/userservice';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanDeactivate<LoginComponent> {
  constructor(
    private authService:userServices,
    private roter:Router
  ){}
  canActivate(
    ): boolean {
   if(this.authService.isUserLoggedIn()){
  
    return true
   }else{
    this.roter.navigate(['login'])
    return false
   
   }
  }
  canDeactivate(
    component: LoginComponent,
   ): boolean {
    if(this.authService.isUserLoggedIn()){
     
      return true
    }else{
      return false
    }
  }
  
}
