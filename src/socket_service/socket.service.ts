import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  constructor() {
    // Conectar al servidor de socket.io (modifica la URL por la de tu servidor)
    // this.socket = io('http://localhost:3000'); // Cambia por la URL de tu backend
  }

  // Método para emitir eventos (enviar datos)
  emitEvent(event: string, data: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
    }
  }

  // Método para escuchar eventos del servidor
  listenEvent(event: string): Observable<any> {
    if (this.socket) {
      return new Observable((subscriber) => {
        this.socket.on(event, (data) => {
          subscriber.next(data);
        });
      });
    } else {
      return new Observable();
    }
  }

  // Método para desconectarse del socket
  // disconnect(): void {
  //   console.log("HOLAAAAAAAA");
  //   this.socket.disconnect();
  // }

  //modificacion
  connect(): void {
    if (!this.socket) {
      this.socket = io('http://localhost:3000'); // Cambia por la URL de tu backend
    }
  }
}
