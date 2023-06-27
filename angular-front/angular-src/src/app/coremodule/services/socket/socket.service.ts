import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io,Socket} from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
private socket!:Socket
  constructor() { }
  connect():void{
 this.socket=io('https://codforum.onrender.com')
 this.socket.on("error", (error) => {
  console.log("Socket connection error: " + error.message);
});

  }

  get answer():Observable<any>{
    return new Observable<any>((observer)=>{
      this.socket.on('answer',(answer:any)=>{
        observer.next(answer)
      })
    })
  }

  get comment():Observable<any>{
    return new Observable<any>((observer)=>{
      this.socket.on('comment',(newComment:any)=>{
        observer.next(newComment)
      })
    })
  }

  get artComment():Observable<any>{
    return new Observable<any>((observer)=>{
      this.socket.on('comment',(newArtComment)=>{
        observer.next(newArtComment)
      })
    })
  }
}
