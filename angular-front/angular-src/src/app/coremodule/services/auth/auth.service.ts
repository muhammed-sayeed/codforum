import { Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn:'root'
})
export class authservice{
   constructor(private http:HttpClient){}

   updateToken(token:string){
      return this.http.post(environment.apiUrl+'updatetoken',{token})
   }
}