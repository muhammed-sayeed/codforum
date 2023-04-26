import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate, CanDeactivate<LoginComponent> {
  constructor(
    private authService:AuthService,
    private router:Router
  ){}
  canActivate(
    ): boolean {
   if(this.authService.isAdminLoggedIn()){
    return true
   }else{
    this.router.navigate(['login'])
    return false
   }
  }
  canDeactivate(
    component: LoginComponent,
   ):boolean{
if(this.authService.isAdminLoggedIn()){

 
  return true;
}else{
  return false
}
   
    
  }
  
}
