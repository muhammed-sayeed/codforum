import { Component ,OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { removeTagAction } from 'src/app/featureModule/store/actions/removetag';
import { tagListAction } from 'src/app/featureModule/store/actions/taglist';
import { isTagSelector } from 'src/app/featureModule/store/selectors';
import { taglist } from 'src/app/coremodule/interfaces/taglist.interface';

import Swal from 'sweetalert2';
import { adminService } from '../../services/adminservice';
import { successState } from 'src/app/coremodule/interfaces/success.interface';

@Component({
  selector: 'app-taglist',
  templateUrl: './taglist.component.html',
  styleUrls: ['./taglist.component.css']
})
export class TaglistComponent implements OnInit {
  tags!:taglist[]
  listData$:Observable<taglist[]>
  data = new FormData()
  constructor(
    private store:Store<AppStateInterface>,
    private authService:adminService
  ){
    this.store.dispatch(tagListAction())

    this.listData$ = this.store.pipe(select(isTagSelector))

    this.listData$.subscribe({next:(data)=>{
      this.tags = data
      console.log('tagss',this.tags);
      
    }})
  }

  ngOnInit(): void {
   
  
  }
  removeTag(Id:string){
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
        this.authService.removeTag(Id).subscribe((data:successState)=>{
          if(data.success){
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
          this.store.dispatch(tagListAction())
         })
      
      }
    })
  
  }

 

}
