import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { communityDetailAction } from 'src/app/store2/actions/communitylist';
import { articleType } from 'src/app/types/artcle';
import { taglist } from 'src/app/types/taglist.interface';

@Component({
  selector: 'app-communitydetail',
  templateUrl: './communitydetail.component.html',
  styleUrls: ['./communitydetail.component.css']
})
export class CommunitydetailComponent {


    Qn:any
  show =true
  show2 = false
  articleModal=false
 
  Modal = false
  articleApproval = false
  event=false
  isModerator!:any
 visibleArt:articleType[]=[]
 invisibleArt:articleType[]=[]
  community:any
  tags!:taglist[]
 
 
Id = this.router.snapshot.paramMap.get('id') as string

  constructor(
    private authService:AuthService,
    private router:ActivatedRoute,
    private store:Store
  ){
    
    
     authService.communityDetails(this.Id).subscribe((data:any)=>{
      
       this.community = data.community
       this.tags=data.community.tags
       this.Qn=data.questions
      this.isModerator= data.userType
      this.visibleArt=data.visibleArt
      this.invisibleArt=data.inVisibleArt
     console.log(this.visibleArt);
     
     })
  }
Join(Id:string){
let button= document.getElementById('join')
button?.classList.remove('bg-green-500')
button?.classList.add('bg-red-400')
if(button?.innerHTML) button.innerHTML = 'Joined'


this.authService.joinCommunity(Id).subscribe((data)=>{
  console.log(data);
  
})
}
  action(){
    this.show = true
    this.show2 = false
  }
  action2(){
   
    this.show2 = true
    this.show = false
  }

  

  approval(){
    this.articleApproval = !this.articleApproval
  }

  

  eventModal(){
    this.Modal=!this.Modal
  }
  modalEvent(){
    this.event= !this.event
  }
  articleModalShow(){
    this.articleModal=!this.articleModal
  }
  articleSubmit(Id:string){
    console.log(Id);
    
    this.authService.submitArticle(Id).subscribe((data:any)=>{
      console.log(data);
      
      
    })
  }
  articleReject(Id:string){
 this.authService.rejectArticle(Id).subscribe((data:any)=>{
  console.log(data);
  
 })
  }

}
