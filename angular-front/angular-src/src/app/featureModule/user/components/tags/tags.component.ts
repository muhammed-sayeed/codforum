import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { debounceTime, Observable, switchMap } from 'rxjs';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import { tagListAction } from 'src/app/featureModule/store/actions/taglist';
import { isTagSelector } from 'src/app/featureModule/store/selectors';
import { taglist } from 'src/app/coremodule/interfaces/taglist.interface';
import { userServices } from '../../service/userservice';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags!:taglist[]
  listData$:Observable<taglist[]>
  searchControl : FormControl = new FormControl()

  dataLoaded = false
  constructor(
 private STORE:Store<AppStateInterface>,
 private authService:userServices
 ){
  this.STORE.dispatch(tagListAction())
  this.listData$ = this.STORE.pipe(select(isTagSelector))

    this.listData$.subscribe({next:(data)=>{
      this.tags = data
     this.dataLoaded = true
    }})
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(1000),(switchMap(val=>{
      return this.authService.searchTags(val)
    }))).subscribe((data:any)=>{
      const tags = data.tagdetails
      this.tags = tags
    })
  }

}
