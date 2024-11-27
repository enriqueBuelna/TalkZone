import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { AsideComponent } from '../../utils/aside/aside.component';
import { ChoosePostComponent } from './choose-post/choose-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';
import { RouterOutlet } from '@angular/router';
import { UserDemo } from '../../../domain/models/user-demo.model';
import { UserService } from '../auth/services/user.service';
import { AuthService } from '../../../domain/services/auth.service';
import { Observable } from 'rxjs';
import { MyUserInformation } from './services/information_user.service';
import { OnlineUsersComponent } from "./online-users/online-users.component";

@Component({
  selector: 'app-my-feed',
  standalone: true,
  imports: [AsideComponent, RouterOutlet, HeaderComponent, OnlineUsersComponent],
  templateUrl: './my-feed.component.html',
  styleUrl: './my-feed.component.css',
})
export class MyFeedComponent implements OnInit{
  myObservable!:Observable<any>;
  
  constructor(private _userService: AuthService, private _user: UserService, private _userInformation: MyUserInformation){

  }

  ngOnInit(){
    this.myObservable = this._userService.getBasicInfo(this._user.getUserId());

    this.myObservable.subscribe(el => {
      this._userInformation.setMyUserInformation(el);
    })
  }
}