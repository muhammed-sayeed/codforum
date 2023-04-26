import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userLoged!:boolean
  constructor(
    public authService:AuthService,
    private router:Router
  ){
 this.userLoged =  authService.isUserLoggedIn()
  }

  logout(){
    this.authService.userLogout()
    this.router.navigate(['/login'])
    return false
  }

}
