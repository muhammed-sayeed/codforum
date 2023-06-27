import { Component,AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/coremodule/interfaces/appstate.interface';
import {Observable } from 'rxjs'
import { badgeList } from 'src/app/coremodule/interfaces/badge.interface';
import { badgeSelector } from 'src/app/featureModule/store/selectors';


@Component({
  selector: 'app-badgedetails',
  templateUrl: './badgedetails.component.html',
  styleUrls: ['./badgedetails.component.css']
})
export class BadgedetailsComponent implements AfterViewInit  {
  badgeList$!:Observable<badgeList[]>
  list:any
  Id =  this.router.snapshot.paramMap.get('id') as string
  
  constructor(
    private router:ActivatedRoute,
    private store:Store<AppStateInterface>
  ){
    
  
  }


ngAfterViewInit(): void {
  this.badgeList$ = this.store.pipe(select(badgeSelector))
  this.badgeList$.subscribe((data)=>{
    data.map((x)=>{
      if(x._id == this.Id){
        this.list = x
        console.log(x);
        
      }
    })
  })
}



}
