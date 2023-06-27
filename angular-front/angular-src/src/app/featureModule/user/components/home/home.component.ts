import { Component,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getQuestionsAction } from 'src/app/featureModule/store/actions/useractions';
import { userServices } from '../../service/userservice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Qn!: any;
  voteCount!:number
  dataLoaded=false
  constructor(private store: Store, private userService: userServices) {
    // this.store.dispatch(getQuestionsAction())
   
  }
 ngOnInit(): void {

  this.userService.getQuestions().subscribe((data: any) => {
    this.Qn = data.questions;
    this.dataLoaded=true
    console.log('questions',this.Qn);
    
  });
 
 }
}
