import { Component, OnInit } from '@angular/core';
import { AsideComponent } from '../../utils/aside/aside.component';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../auth/services/user.service';
import { AuthService } from '../../../domain/services/auth.service';
import { Observable } from 'rxjs';
import { MyUserInformation } from './services/information_user.service';
import { OnlineUsersComponent } from './online-users/online-users.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-my-feed',
  standalone: true,
  imports: [
    AsideComponent,
    RouterOutlet,
    OnlineUsersComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './my-feed.component.html',
  styleUrl: './my-feed.component.css',
})
export class MyFeedComponent implements OnInit {
  myObservable!: Observable<any>;
  formSearch!: FormGroup;
  constructor(
    private _userService: AuthService,
    private _user: UserService,
    private _userInformation: MyUserInformation,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.formSearch = this._formBuilder.group({
      search: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.myObservable = this._userService.getBasicInfo(this._user.getUserId());

    this.myObservable.subscribe((el) => {
      this._userInformation.setMyUserInformation(el);
    });
  }

  search() {
    if (this.formSearch.valid) {
      let { search } = this.formSearch.value;
      this._router.navigate(['home', 'posts', 'search', search]);
    }
  }
}
