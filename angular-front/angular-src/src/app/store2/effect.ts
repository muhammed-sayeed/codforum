import { createEffect,Actions, ofType } from "@ngrx/effects";
import { Injectable} from '@angular/core'
import { switchMap, mergeMap, map, catchError, of, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { tagQnAction, tagQnSuccessAction } from "./actions/tagqn";
import { communityDetailAction, communityDetailSuccessAction } from "./actions/communitylist";


@Injectable()

//-----------------QN BASED TAG-----------------------------
export class registerEffects {
    tagQnList$ = createEffect(()=>
    this.action$.pipe(
        ofType(tagQnAction),
        mergeMap((Request)=>{
            return this.authService.tagQn(Request).pipe(
                map((result:any)=> result.qnlist),
                map((Result)=>{
                    return tagQnSuccessAction(Result)
                })
            )
        })
    )
    )

//-------------------COMMUNITY LIST------------------------------
  communityDetail$ = createEffect(()=>
  this.action$.pipe(
    ofType(communityDetailAction),
    mergeMap((Request)=>{
         return this.authService.communityDetails(Request).pipe(
            map((Result:any)=>Result.community),
            map((result)=>{
                return communityDetailSuccessAction(result)
            })
        )
    })
  ))   

    constructor(
        private action$: Actions,
        private authService: AuthService,
        private roter: Router,
        private location: Location
      ) {}
}

