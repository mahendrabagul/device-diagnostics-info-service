import {Injectable} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {Device} from "./device";
import {Socket} from "./interface";
import {Observable, Observer} from "rxjs";


declare var io: {
  connect(url: string): Socket;
};

@Injectable()
export class DataService {

  socket: Socket;
  observer: Observer<Device[]>;

  getDevices(): Observable<Device[]> {
    this.socket = socketIo('http://localhost:3000/devices');
    this.socket.on('data', (res) => {
      this.observer.next(res.data);
    });
    return this.createObservable();
  }

  createObservable(): Observable<Device[]> {
    return new Observable<Device[]>(observer => {
      this.observer = observer;
    });
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }

}
