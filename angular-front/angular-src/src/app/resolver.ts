import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { userListAction,userListSuccessAction } from "./store/action/userlist.action";
import { Actions, ofType } from "@ngrx/effects";
import { AppStateInterface } from "./shared/types/appstate.interface";
@Injectable()
export class DataRsolver implements Resolve<any>{
    constructor(
        private store:Store<AppStateInterface>,
        private action$ : Actions
    ){}
    resolve():Observable<any>{
     this.store.dispatch(userListAction())
     return this.action$.pipe(ofType(userListSuccessAction))
    }

}