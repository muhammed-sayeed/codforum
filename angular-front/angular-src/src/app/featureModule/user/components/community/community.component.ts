import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { communityListAction } from 'src/app/featureModule/store/actions/community';
import { communitySelector } from 'src/app/featureModule/store/selectors';
import { communityList } from 'src/app/coremodule/interfaces/community.interface';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
 dataLoaded=false
  communityList$:Observable<communityList[]>
  list!:communityList[]
  searchControl : FormControl = new FormControl()

  constructor( private store:Store<AppStateInterface>){

    this.store.dispatch(communityListAction())
    this.communityList$ = this.store.pipe(select(communitySelector))
    this.communityList$.subscribe({next:(data)=>{
      this.list = data
      console.log('listtt',this.list);
      
      this.dataLoaded = true
    }})
    
  }
}
