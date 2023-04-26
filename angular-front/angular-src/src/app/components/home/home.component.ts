import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { getQuestionsAction } from 'src/app/store/action/useractions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Qn!: any;
  voteCount!:number
  dataLoaded=false
  constructor(private store: Store, private authService: AuthService) {
    // this.store.dispatch(getQuestionsAction())
   
  }
 ngOnInit(): void {

  this.authService.getQuestions().subscribe((data: any) => {
    this.Qn = data.questions;
    this.dataLoaded=true
    console.log('questions',this.Qn);
    
  });
 
 }
}
