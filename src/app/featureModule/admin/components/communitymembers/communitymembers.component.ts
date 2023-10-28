import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { communityListAction } from 'src/app/featureModule/store/actions/community';
import { removeMemberAction } from 'src/app/featureModule/store/actions/removemember';
import { communitySelector } from 'src/app/featureModule/store/selectors';
import { communityList } from 'src/app/coremodule/interfaces/community.interface';
import { tagDetail } from 'src/app/coremodule/interfaces/tagDetail.interface';
import { memberDeatail } from 'src/app/coremodule/interfaces/memberDetail.interface';
import { listInterface } from 'src/app/coremodule/interfaces/list.interface';

@Component({
  selector: 'app-communitymembers',
  templateUrl: './communitymembers.component.html',
  styleUrls: ['./communitymembers.component.css']
})
export class CommunitymembersComponent implements AfterViewInit{
  communityList$!:Observable<communityList[]>
  list!:communityList ;
  
  id = this.Router.snapshot.paramMap.get('id');
  
  constructor(
    private store:Store<AppStateInterface>,
    private Router:ActivatedRoute
    ){
      
       }
  ngAfterViewInit(): void {
    this.communityList$ = this.store.pipe(select(communitySelector))
    this.store.dispatch(communityListAction())
    this.communityList$.subscribe({next:(data)=>{
       data.map((x)=>{
        if (x._id == this.id) {
          this.list = x;
          console.log(x);
          
        }
       })
    }})
    
  }

  remove(Id:string){
    const data = {
      Id : Id,
      ID : this.id
    }
   this.store.dispatch(removeMemberAction(data))
   this.store.dispatch(communityListAction())
   
  }
}
