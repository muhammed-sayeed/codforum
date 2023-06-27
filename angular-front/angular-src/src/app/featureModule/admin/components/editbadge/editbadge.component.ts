import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { editBadgeAction } from 'src/app/featureModule/store/actions/editbadge';

@Component({
  selector: 'app-editbadge',
  templateUrl: './editbadge.component.html',
  styleUrls: ['./editbadge.component.css']
})
export class EditbadgeComponent {
  name = this.router.snapshot.paramMap.get('name')
  criteria = this.router.snapshot.paramMap.get('criteria')
  Id = this.router.snapshot.paramMap.get('id')
  constructor(
    private router:ActivatedRoute,
    private store:Store
  ){
    console.log(this.Id,'iiid');
    
  }
addUpdate(){
const data ={
  id : this.Id,
  name:this.name,
  criteria:this.criteria
}
this.store.dispatch(editBadgeAction(data))
}


}
