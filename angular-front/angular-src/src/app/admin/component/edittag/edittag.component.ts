import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { editTagAction } from 'src/app/store/action/edittag';

@Component({
  selector: 'app-edittag',
  templateUrl: './edittag.component.html',
  styleUrls: ['./edittag.component.css'],
})
export class EdittagComponent {
  name = this.router.snapshot.paramMap.get('name');
  description = this.router.snapshot.paramMap.get('description');
  Id = this.router.snapshot.paramMap.get('id');
  // image = this.router.snapshot.paramMap.get('image');
 

  constructor(private store: Store, private router: ActivatedRoute) {}

  // setImg(event: any) {
  //   const image = event.target.files[0];
  //   const tagData = new FormData();
  //   console.log(event.target.files[0]);
  //   tagData.append('img', event.target.files[0]);
  //   tagData.append('name', this.name);
  //   tagData.append('description', this.description);
  //   this.DATA = tagData;
  // }

 

  addUpdate() {
  const updates ={
    Id:this.Id,
    name:this.name,
    description:this.description
    }

    this.store.dispatch(editTagAction(updates));
  }
}
