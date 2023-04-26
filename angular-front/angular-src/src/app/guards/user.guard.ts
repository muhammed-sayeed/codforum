import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanDeactivate<LoginComponent> {
  constructor(
    private authService:AuthService,
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
