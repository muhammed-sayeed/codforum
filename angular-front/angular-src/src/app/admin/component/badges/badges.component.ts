import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/appstate.interface';
import { badgeListAction } from 'src/app/store/action/badgelist';
import { badgeSelector } from 'src/app/store/selectors';
import { badgeList } from 'src/app/types/badge.interface';
import { Observable} from 'rxjs'

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent {
  badgelist$:Observable<badgeList[]>
  list!:badgeList[]

  constructor(
    private store:Store<AppStateInterface>
  ){
  this.store.dispatch(badgeListAction())
  this.badgelist$ = this.store.pipe(select(badgeSelector))
  this.badgelist$.subscribe({next:(data)=>{
    this.list = data
  }})
  }

}
