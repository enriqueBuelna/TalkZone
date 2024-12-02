import { Component, Input, OnInit, signal } from '@angular/core';
import { UserComplete } from '../../../../domain/models/user_complete_information.model';
import { GroupComplete } from '../../../../domain/models/group/groupComplete.model';
import { CommonModule } from '@angular/common';
import { FollowerItemComponent } from './follower-item/follower-item.component';
import { UserService } from '../../auth/services/user.service';
import { AuthService } from '../../../../domain/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FollowerService } from '../../../../domain/services/follower.service';
@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [CommonModule, FollowerItemComponent],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.css',
})
export class ProfileInformationComponent implements OnInit {
  @Input() myUser!: UserComplete;
  @Input() myGroup!: GroupComplete;
  @Input() type!: string;
  @Input() access!: boolean;

  constructor(
    private _userService: UserService,
    private _remoteUserService: AuthService,
    private _route: ActivatedRoute,
    private _followService: FollowerService
  ) {}

  ngOnInit(): void {
    if (!this.access) {
      this._remoteUserService
        .amFollowing(
          this._userService.getUserId(),
          this._route.snapshot.paramMap.get('user_id') || ''
        )
        .subscribe((el) => {
          this.isFollowing = el;
        });
    }
  }

  path = 'images/background.jpg';

  viewFollowers = signal(false);
  viewFollowing = signal(false);
  viewMembers = signal(false);

  viewFollowingg() {
    this.viewFollowing.set(!this.viewFollowing());
  }

  viewFollowerss() {
    this.viewFollowers.set(!this.viewFollowers());
  }

  viewMemberss() {
    this.viewMembers.set(!this.viewMembers());
  }

  isFollowing: boolean = false;

  toggleFollow() {
    if(this.isFollowing){
      this._followService
          .unfollowUser(this._userService.getUserId(),  this._route.snapshot.paramMap.get('user_id') || '')
          .subscribe((el) => {
            if (el) {
              this.isFollowing = !this.isFollowing;
            }
          });
    }else{
      this._followService
          .followUser(this._userService.getUserId(),  this._route.snapshot.paramMap.get('user_id') || '')
          .subscribe((el) => {
            if (el) {
              this.isFollowing = !this.isFollowing;
            }
          });
    }
  }
}
