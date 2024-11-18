import { Component } from '@angular/core';
import { HeaderComponent } from "../../../utils/header/header.component";
import { AsideComponent } from "../../../utils/aside/aside.component";
import { ButtonComponent } from "../../../utils/button/button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-group',
  standalone: true,
  imports: [HeaderComponent, AsideComponent, ButtonComponent],
  templateUrl: './welcome-group.component.html',
  styleUrl: './welcome-group.component.css'
})
export class WelcomeGroupComponent {
  band = false;

  constructor(private _router:Router){

  }

  goToDiscover(){
    this._router.navigate(['home','groups'])
  }
}
