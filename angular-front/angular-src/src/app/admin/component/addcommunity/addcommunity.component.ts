import { Component ,OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { moderatorListAction } from 'src/app/store/action/moderatorlist';
import {Observable } from 'rxjs'
import { myState } from 'src/app/types/userlist.interface';
import { isAllDataSelector, isTagSelector } from 'src/app/store/selectors';
import { AppStateInterface } from 'src/app/shared/types/appstate.interface';
import { addCommunityAction } from 'src/app/store/action/addcommunity';
import { taglist } from 'src/app/types/taglist.interface';
import { tagListAction } from 'src/app/store/action/taglist';

@Component({
  selector: 'app-addcommunity',
  templateUrl: './addcommunity.component.html',
  styleUrls: ['./addcommunity.component.css']
})
export class AddcommunityComponent implements OnInit{
  list!:myState[]
  addButton = false
  listData$:Observable<myState[]>
 usernames:string[] =[]
 tagnames:string[]=[]
 Tags:string[]=[]
  members:string[] = []
  name!:string
  description!:string
  DATA:any = new FormData()

  tags!:taglist[]
 
  tagList$:Observable<taglist[]>
 
  constructor(
    private store:Store<AppStateInterface>
  ){
  this.store.dispatch(moderatorListAction())
  this.listData$ = this.store.pipe(select(isAllDataSelector))
  this.listData$.subscribe({next:(data)=>{
    console.log('data',data);
     this.list= data

     
   
  }})

  this.store.dispatch(tagListAction())

     this.tagList$ = this.store.pipe(select(isTagSelector))
 
     this.tagList$.subscribe({next:(data)=>{
       this.tags = data
      
     }})

  
  }

  ngOnInit(): void {
    
  }

add(Id:string,name:string, event:any){

    this.members.push(Id)
    this.usernames.push(name)
    event.target.disabled = true
     }

     addTag(Id:string,name:string, event:any){
      this.Tags.push(Id)
      this.tagnames.push(name)
      event.target.disabled = true
     }

setImg(event:any){
  const image = event.target.files[0]
  this.DATA.append('img',event.target.files[0])
}

addCommunity(){
  this.DATA.append('name',this.name)
  this.DATA.append('description',this.description)
  this.DATA.append('tags',JSON.stringify(this.Tags))
  this.DATA.append('members',JSON.stringify(this.members))
  this.store.dispatch(addCommunityAction({value:this.DATA}))
}

}
