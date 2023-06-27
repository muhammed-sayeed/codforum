import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addBadgeAction } from 'src/app/featureModule/store/actions/addbadge';

@Component({
  selector: 'app-addbadge',
  templateUrl: './addbadge.component.html',
  styleUrls: ['./addbadge.component.css']
})
export class AddbadgeComponent {
  name!:string
  criteria!:string

  constructor(
    private store:Store
  ){}

  addBadge(){
    const data = {
      name:this.name,
      criteria:this.criteria
    }
  this.store.dispatch(addBadgeAction(data))
  }

}
