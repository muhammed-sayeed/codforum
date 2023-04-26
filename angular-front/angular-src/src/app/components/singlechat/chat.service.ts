import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn:'root'
})
export class ChatServiceService {

  private socket = io('http://localhost:3000');
  constructor(private http:HttpClient) { }

  joinRoom(data:any) {
    console.log(data);
    this.socket.emit('join', data);
  }

  sendMessage(data:any) {
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    const observable = new Observable<{ user: String, message: String,messageTime:Date}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data:any) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getChatRoomsChat(roomId:string){
    return this.http.get('http://localhost:3000/getchat/'+roomId)
  }
}