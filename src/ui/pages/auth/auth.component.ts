import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../utils/button/button.component';
import { ModalComponent } from '../../utils/modal/modal.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ButtonComponent, ModalComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  // navegate(step:string, where:string){
  //   this._router.navigate([where,step]);
  // }

  onLogin() {
    throw new Error('Method not implemented.');
  }
}
