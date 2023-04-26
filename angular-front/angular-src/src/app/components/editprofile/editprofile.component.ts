import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { updateProfileAction } from 'src/app/store/action/updateprofile';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  username = this.route.snapshot.paramMap.get('username')
  email = this.route.snapshot.paramMap.get('email')
  Id = this.route.snapshot.paramMap.get('id')
  job!:string
  education!:string
  bio!:string
  place!:string

  

 constructor(
  private route:ActivatedRoute,
  private store:Store
  ){
  
  console.log(this.Id);
 }


  submitUpdate(){
    console.log('called');
    
    const data ={
      Id :this.Id,
      username:this.username,
      job:this.job,
      education:this.education,
      bio:this.bio,
      place:this.place
    }
this.store.dispatch(updateProfileAction(data))
  }
}
