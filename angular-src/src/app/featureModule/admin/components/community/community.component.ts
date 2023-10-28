import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { communityListAction } from 'src/app/featureModule/store/actions/community';
import { Observable} from 'rxjs'
import { communityList } from 'src/app/coremodule/interfaces/community.interface';
import { communitySelector } from 'src/app/featureModule/store/selectors';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { removeCommunityAction } from 'src/app/featureModule/store/actions/removeComm';

import Swal from 'sweetalert2';


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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(removeCommunityAction({Id}))
        this.store.dispatch(communityListAction())
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  
  }

}
