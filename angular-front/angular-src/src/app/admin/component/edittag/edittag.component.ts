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
 

  constructor(private store: Store, private router: ActivatedRoute) {}


 

  addUpdate() {
  const updates ={
    Id:this.Id,
    name:this.name,
    description:this.description
    }

    this.store.dispatch(editTagAction(updates));
  }
}
