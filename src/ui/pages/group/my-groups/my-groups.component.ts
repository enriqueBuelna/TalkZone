import { Component } from '@angular/core';
import { HeaderComponent } from "../../../utils/header/header.component";

@Component({
  selector: 'app-my-groups',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './my-groups.component.html',
  styleUrl: './my-groups.component.css'
})
export class MyGroupsComponent {

}
