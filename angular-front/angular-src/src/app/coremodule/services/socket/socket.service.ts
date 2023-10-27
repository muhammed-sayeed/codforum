import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
private socket!:any
  constructor() { }
  connect():void{
 this.socket=io('https://codforum.onrender.com')
 this.socket.on("error", (error:any) => {
  console.log("Socket connection error: " + error.message);
});

  }

  get answer():Observable<any>{
    return new Observable<any>((observer)=>{
      this.socket.on('answer',(answer:string)=>{
        observer.next(answer)
      })
    })
  }

  get comment():Observable<any>{
    return new Observable<any>((observer)=>{
      this.socket.on('comment',(newComment:string)=>{
        observer.next(newComment)
      })
    })
  }

  get artComment():Observable<any>{
    return new Observable<any>((observer)=>{
      this.socket.on('comment',(newArtComment:string)=>{
        observer.next(newArtComment)
      })
    })
  }
}
