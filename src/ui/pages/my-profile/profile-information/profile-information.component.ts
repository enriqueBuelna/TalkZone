import { Component, Input, signal } from '@angular/core';
import { UserComplete } from '../../../../domain/models/user_complete_information.model';
import { GroupComplete } from '../../../../domain/models/group/groupComplete.model';
import { CommonModule } from '@angular/common';
import { FollowerItemComponent } from "./follower-item/follower-item.component";
@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [CommonModule, FollowerItemComponent],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.css'
})
export class ProfileInformationComponent {
  @Input() myUser!:UserComplete;
  @Input() myGroup!:GroupComplete;
  @Input() type!:string;
  path = 'images/background.jpg'

  viewFollowers = signal(false);
  viewFollowing = signal(false);

  viewFollowingg(){
    this.viewFollowing.set(!this.viewFollowing());
  }

  viewFollowerss(){
    this.viewFollowers.set(!this.viewFollowers())
  }
}
