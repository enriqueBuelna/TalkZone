import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageSuccess {
  success = signal(false);

  getSuccess(){
    return this.success;
  }

  setSuccess(){
    this.success.set(!this.success());
  }
  
  setFalse(){
    this.success.set(false);
  }
}
