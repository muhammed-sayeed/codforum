import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { communityListAction } from 'src/app/store/action/community';
import { Observable} from 'rxjs'
import { communityList } from 'src/app/types/community.interface';
import { communitySelector } from 'src/app/store/selectors';
import { AppStateInterface } from 'src/app/shared/types/appstate.interface';
import { removeCommunityAction } from 'src/app/store/action/removeComm';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
  communityList$:Observable<communityList[]>
  list!:communityList[]

  constructor( private store:Store<AppStateInterface>){

    this.store.dispatch(communityListAction())
    this.communityList$ = this.store.pipe(select(communitySelector))
    this.communityList$.subscribe({next:(data)=>{
      this.list = data
    }})
    
  }

  removeCommunity(Id:string){
   this.store.dispatch(removeCommunityAction({Id}))
   this.store.dispatch(communityListAction())
  }

}
