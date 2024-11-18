import { Component } from '@angular/core';
import { HeaderComponent } from "../../../utils/header/header.component";

@Component({
  selector: 'app-my-feed',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './my-feed.component.html',
  styleUrl: './my-feed.component.css'
})
export class MyFeedGroupComponent {

}
