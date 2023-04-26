import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent {

  constructor(
    private authService:AuthService,
    private route:Router
  ){}

  logout(){
    this.authService.adminLogout()
    this.route.navigate(['/login'])
    return false;
  }

}
