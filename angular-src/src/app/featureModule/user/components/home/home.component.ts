import { Component,OnInit } from '@angular/core';
import { userServices } from '../../service/userservice';
import { singleQninterface } from 'src/app/coremodule/interfaces/singleQn.interface';
import { loadingService } from 'src/app/coremodule/services/Loader/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Qn: singleQninterface[] = []
  voteCount!:number
  constructor(
     private userService: userServices,
     private loaderService: loadingService
     ) { }
 ngOnInit(): void {
 this.loaderService.show()
 setTimeout(()=>{
  this.userService.getQuestions().subscribe((data: {questions:[]}) => {
    this.Qn = data.questions;
    this.loaderService.hide()
  });
  
 },3000)
   
 
 }
 
}