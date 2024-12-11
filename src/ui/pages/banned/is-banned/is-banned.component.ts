import { Component } from '@angular/core';
import { UserService } from '../../auth/services/user.service';
import { Router } from '@angular/router';
import { ButtonComponent } from "../../../utils/button/button.component";

@Component({
  selector: 'app-is-banned',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './is-banned.component.html',
  styleUrl: './is-banned.component.css'
})
export class IsBannedComponent {
  constructor(private _userService: UserService, private _router:Router){

  }
  goToHome(){
    this._userService.clearAuthData();
    this._router.navigate(['']);
  }
}
