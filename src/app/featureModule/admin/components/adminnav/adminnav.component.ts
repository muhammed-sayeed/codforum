import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { adminService } from '../../services/adminservice';

@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent {

  constructor(
    private authService:adminService,
    private route:Router
  ){}

  logout(){
    this.authService.adminLogout()
    this.route.navigate(['/login'])
    return false;
  }

}
