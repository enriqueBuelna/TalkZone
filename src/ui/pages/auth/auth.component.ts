import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../utils/button/button.component';
import { ModalComponent } from '../../utils/modal/modal.component';
import { RegisterApp } from "./register/register.component";
import { LoginApp } from "./login/login.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, RegisterApp, LoginApp],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  // navegate(step:string, where:string){
  //   this._router.navigate([where,step]);
  // }

  register: boolean = false;
  login: boolean = false;

  onLogin() {
    this.login = true;
  }

  onRegister(){
    this.register = true;
  }

  closeModal(){
    this.login = false;
    this.register = false;
  }
}
