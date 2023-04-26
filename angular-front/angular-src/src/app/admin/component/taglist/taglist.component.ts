import { Component ,OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppStateInterface } from 'src/app/shared/types/appstate.interface';
import { removeTagAction } from 'src/app/store/action/removetag';
import { tagListAction } from 'src/app/store/action/taglist';
import { isTagSelector } from 'src/app/store/selectors';
import { taglist } from 'src/app/types/taglist.interface';

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
    private authService:AuthService
  ){
    this.store.dispatch(tagListAction())

    this.listData$ = this.store.pipe(select(isTagSelector))

    this.listData$.subscribe({next:(data)=>{
      this.tags = data
     
    }})
  }

  ngOnInit(): void {
   
  
  }
  removeTag(Id:string){
  //  this.store.dispatch(removeTagAction({Id}))
   this.authService.removeTag(Id).subscribe((data)=>{
    this.store.dispatch(tagListAction())
   })
  }

  imgChange(event:any,Id:string){
    console.log(Id,'iiiiiii');
    
    const image = event.target.files[0]
    this.data.append('img',image)
    this.data.append('id',Id)
    this.authService.updateImg(this.data).subscribe((data)=>{
      this.store.dispatch(tagListAction())
    })
  }


}
