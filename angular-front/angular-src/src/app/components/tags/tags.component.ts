import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { debounceTime, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppStateInterface } from 'src/app/shared/types/appstate.interface';
import { tagListAction } from 'src/app/store/action/taglist';
import { isTagSelector } from 'src/app/store/selectors';
import { taglist } from 'src/app/types/taglist.interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags!:taglist[]
  listData$:Observable<taglist[]>
  searchControl : FormControl = new FormControl()

  constructor(
 private STORE:Store<AppStateInterface>,
 private authService:AuthService
 ){
  this.STORE.dispatch(tagListAction())
  this.listData$ = this.STORE.pipe(select(isTagSelector))

    this.listData$.subscribe({next:(data)=>{
      this.tags = data
     
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
