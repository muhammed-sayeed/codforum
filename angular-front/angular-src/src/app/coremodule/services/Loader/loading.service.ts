import { Injectable, inject } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
   providedIn:'root'
})
export class loadingService{

    public isLoading = new BehaviorSubject<boolean>(false)

    show(){
        this.isLoading.next(true)
    }
    hide(){
        this.isLoading.next(false)
    }
}