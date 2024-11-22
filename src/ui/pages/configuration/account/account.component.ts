import { Component } from '@angular/core';
import { HeaderComponent } from "../../../utils/header/header.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}
