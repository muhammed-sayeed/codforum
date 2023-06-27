import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userServices } from '../../service/userservice';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  userLoged!:boolean
  constructor(
   public userService:userServices,
    private router:Router,
    private activateRouter:ActivatedRoute
  ){
 this.userLoged =  userService.isUserLoggedIn()
 this.router.events.subscribe(event => {
  if (this.activateRouter.snapshot.url.join('/').includes('profile')) {
    this.isLoggedIn = true;
  }
});
  }

  logout(){
    this.userService.userLogout()
    this.router.navigate(['/login'])
    return false
  }

}
