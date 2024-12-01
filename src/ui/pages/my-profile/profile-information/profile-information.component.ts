import { Component, Input, OnInit, signal } from '@angular/core';
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
export class ProfileInformationComponent implements OnInit{
  @Input() myUser!:UserComplete;
  @Input() myGroup!:GroupComplete;
  @Input() type!:string;
  @Input() access!:boolean;

  ngOnInit(): void {
    console.log(this.access);
  }
  
  path = 'images/background.jpg'

  viewFollowers = signal(false);
  viewFollowing = signal(false);
  viewMembers = signal(false);

  viewFollowingg(){
    this.viewFollowing.set(!this.viewFollowing());
  }

  viewFollowerss(){
    this.viewFollowers.set(!this.viewFollowers())
  }

  viewMemberss(){
    this.viewMembers.set(!this.viewMembers());
  }
}
