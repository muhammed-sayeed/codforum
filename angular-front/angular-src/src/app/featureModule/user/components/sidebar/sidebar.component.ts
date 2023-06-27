import { Component,OnInit } from '@angular/core';
import { userServices } from '../../service/userservice';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
userLoged!:boolean
  constructor(
    public authService:userServices
  ){

  }

  ngOnInit(): void {
  this.userLoged =  this.authService.isUserLoggedIn()
  }

}
