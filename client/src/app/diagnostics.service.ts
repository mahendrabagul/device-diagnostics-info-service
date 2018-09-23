import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class DiagnosticsService {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private socket: Socket, private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .pipe(map((response: any): any => {
        return response;
      }));
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    // this.messages.next(msg);
    this.sendMessage(msg);
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  getMessage() {
    return this.socket
      .fromEvent('message').subscribe
      (data => console.log(data));
  }
}
