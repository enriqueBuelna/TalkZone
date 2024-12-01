import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private scrollToBottomSource = new Subject<void>();
  // scrollToBottom$ = this.scrollToBottomSource.asObservable();

  // triggerScrollToBottom() {
  //   this.scrollToBottomSource.next();
  // }
  amHere = true;
  amHereId = '';

  setAmHereId(id:string){
    this.amHereId = id;
  }

  setHere(){
    this.amHere = true;
  }

  setNoHere(){
    this.amHere = false;
  }

  getAmHereId(){
    return this.amHereId;
  }
}
