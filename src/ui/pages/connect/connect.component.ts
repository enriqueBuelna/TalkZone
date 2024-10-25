import { Component } from '@angular/core';
import { AsideComponent } from "../../utils/aside/aside.component";
import { HeaderComponent } from "../../utils/header/header.component";
import { ButtonComponent } from "../../utils/button/button.component";

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [AsideComponent, HeaderComponent, ButtonComponent],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css'
})
export class ConnectComponent {

}
