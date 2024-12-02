import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UserDemo } from '../../../../../domain/models/user-demo.model';
import { FollowerService } from '../../../../../domain/services/follower.service';
import { UserService } from '../../../auth/services/user.service';
import { UserComplete } from '../../../../../domain/models/user_complete_information.model';
import { CommunityMember } from '../../../../../domain/models/communityMember.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follower-item',
  standalone: true,
  imports: [],
  templateUrl: './follower-item.component.html',
  styleUrl: './follower-item.component.css',
})
export class FollowerItemComponent implements OnDestroy, OnInit {
  @Input() follower!: UserDemo;
  text = '';
  unfollowUser = false;
  @Input() type!: string;
  @Input() userComplete!: UserComplete;
  @Input() member!:CommunityMember;
  @Input() hostMember!:string;
  constructor(
    private _followerService: FollowerService,
    public _userService: UserService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    if (this.type === 'following') {
      this.text = 'Dejar de seguir';
    } else if (this.type === 'follower') {
      this.text = 'Eliminar seguidor';
    }
  }

  doAction() {
    if (this.text === 'Dejar de seguir' && this.type === 'following') {
      this._followerService
        .unfollowUser(this._userService.getUserId(), this.follower.getUserId())
        .subscribe((el) => {
          this.unfollowUser = true;
          this.text = 'Seguir';
        });
    } else if (this.text === 'Seguir' && this.type === 'following') {
      this._followerService
        .followUser(this._userService.getUserId(), this.follower.getUserId())
        .subscribe((el) => {
          console.log(el);
          this.text = 'Dejar de seguir';
        });
    }

    if (this.type === 'follower') {
      this._followerService
        .deleteFollower(
          this._userService.getUserId(),
          this.follower.getUserId()
        )
        .subscribe((el) => {
          this.userComplete.deleteFollower(this.follower.getUserId());
        });
    }
  }
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic
  ngOnDestroy(): void {
    if (this.unfollowUser) {
      this.userComplete.deleteFollowing(this.follower.getUserId());
    }
  }

  goToProfile(id:string){
    this.clickEvent.emit();
    this._router.navigate(['home', 'profile', id]);
  }
}
