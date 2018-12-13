import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private host: string;
  private socket: any;

  constructor() {
    this.host = 'http://localhost:8080';
    this.socket = io(this.host);
    this.socket.on('connect', () => this.connected());
    this.socket.on('disconnect', () => this.disconnected());
    this.socket.on('error', (error: string) => {
      console.log(`ERROR: "${error}" (${this.host})`);
    });
  }

  private connected() {
    const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    this.emit('user_token', currentUser.token).subscribe(
      (data) => {
        console.log('Success', data);
      },
      (error) => {
        console.log('Error', error);
      },
      () => {
        console.log('complete');
      }
    );
  }

  private disconnected() {
    console.log('Disconnected');
  }

  connect () {
    this.socket.connect();
  }

  disconnect () {
    this.socket.disconnect();
  }

  emit(chanel: string, message: any) {
    return new Observable<any>(observer => {
      this.socket.emit(chanel, message, function (data) {
        if (data.success) {
          observer.next(data.msg);
        } else {
          observer.error(data.msg);
        }
        observer.complete();
      });
    });
  }

  on(eventName) {
    console.log(`listen to ${eventName}:`);
    return new Observable<any>(observer => {
      this.socket.off(eventName);
      this.socket.on(eventName, (data) => {
        observer.next(data);
      });
    });
  }
}
