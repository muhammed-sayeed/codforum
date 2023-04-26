import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/types/appstate.interface';
import { communityListAction } from 'src/app/store/action/community';
import { removeMemberAction } from 'src/app/store/action/removemember';
import { communitySelector } from 'src/app/store/selectors';
import { communityList } from 'src/app/types/community.interface';

@Component({
  selector: 'app-communitymembers',
  templateUrl: './communitymembers.component.html',
  styleUrls: ['./communitymembers.component.css']
})
export class CommunitymembersComponent implements AfterViewInit{
  communityList$!:Observable<communityList[]>
  list:any ;
  
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
