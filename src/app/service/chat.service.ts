import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly socketUrl: string = 'http://localhost:3500';
  private socket = io(this.socketUrl, { transports: ['websocket'] });

  constructor() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    this.socket.on('message', (message) => {
      console.log('Message received:', message);
    });
  }

  sendMessage(message: string): void {
    console.log('Sending message:', message);
    this.socket.emit('message', message);
  }

  getMessage(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('message', (message: string) => {
        console.log('Message received in service:', message);
        observer.next(message);
      });
    });
  }
}
