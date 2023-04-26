import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTagAction } from 'src/app/store/action/addtag';


@Component({
  selector: 'app-addtag',
  templateUrl: './addtag.component.html',
  styleUrls: ['./addtag.component.css']
})
export class AddtagComponent {

  name!:string
  description!:string
 DATA:any

  constructor(
private store:Store
  ){}


  setImg(event:any){
    const image = event.target.files[0]
    const tagData = new FormData()
     tagData.append('img',event.target.files[0])
     tagData.append('name',this.name)
    tagData.append('description',this.description)
    this.DATA=tagData
  }

 addTag(){
 this.store.dispatch(addTagAction({value:this.DATA}))
 }              
}
