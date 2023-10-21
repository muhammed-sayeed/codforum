import { Component ,OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { moderatorListAction } from 'src/app/featureModule/store/actions/moderatorlist';
import {Observable } from 'rxjs'
import { myState } from 'src/app/coremodule/interfaces/userlist.interface';
import { isAllDataSelector, isTagSelector } from 'src/app/featureModule/store/selectors';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { addCommunityAction } from 'src/app/featureModule/store/actions/addcommunity';
import { taglist } from 'src/app/coremodule/interfaces/taglist.interface';
import { tagListAction } from 'src/app/featureModule/store/actions/taglist';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { adminService } from '../../services/adminservice';
import { addCommunity } from 'src/app/coremodule/interfaces/addCommunity.interface';
import { successState } from 'src/app/coremodule/interfaces/success.interface';

@Component({
  selector: 'app-addcommunity',
  templateUrl: './addcommunity.component.html',
  styleUrls: ['./addcommunity.component.css']
})
export class AddcommunityComponent implements OnInit{
  list!:myState[]
  addButton = false
  listData$!:Observable<myState[]>
 usernames:string[] =[]
 tagnames:string[]=[]
 Tags:string[]=[]
  members:string[] = []
  name!:string
  description!:string
  data! : addCommunity
 

  tags!:taglist[]
 
  tagList$!:Observable<taglist[]>
 
  constructor(
    private store:Store<AppStateInterface>,
    private adminService:adminService,
    private router:Router
  ){


  
  }

  ngOnInit(): void {
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

add(Id:string,name:string, event:MouseEvent){

    this.members.push(Id)
    this.usernames.push(name)
    const target = event.target as HTMLButtonElement
    target.disabled = true
    // event.target.disabled = true
     }

     addTag(Id:string,name:string, event:MouseEvent){
      this.Tags.push(Id)
      this.tagnames.push(name)
      const target = event.target as HTMLButtonElement
      target.disabled = true
      // event.target.disabled = true
     }



addCommunity(){
  // this.DATA.append('name',this.name)
  // this.DATA.append('description',this.description)
  // this.DATA.append('tags',JSON.stringify(this.Tags))
  // this.DATA.append('members',JSON.stringify(this.members))
  this.data = {
    name : this.name,
    description:this.description,
    tags:this.Tags,
    members:this.members
  }

  this.adminService.addCommunity(this.data).subscribe((data:successState)=>{
    if(data.success){
   
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
    this.router.navigate(['/admin/community'])

    }
  })
}

}
