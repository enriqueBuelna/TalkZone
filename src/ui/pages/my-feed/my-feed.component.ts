import { Component, effect, OnInit, signal } from '@angular/core';
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
import { MessageService } from 'primeng/api';
import { MessageSuccess } from './services/messageSucces.service';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-my-feed',
  standalone: true,
  imports: [
    AsideComponent,
    RouterOutlet,
    OnlineUsersComponent,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './my-feed.component.html',
  styleUrl: './my-feed.component.css',
  providers: [MessageService],
})
export class MyFeedComponent implements OnInit {
  myObservable!: Observable<any>;
  formSearch!: FormGroup;
  success = signal(false);
  constructor(
    private _userService: AuthService,
    private _user: UserService,
    private _userInformation: MyUserInformation,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _messageService: MessageService,
    private _messageSuccess: MessageSuccess
  ) {
    this.formSearch = this._formBuilder.group({
      search: ['', [Validators.required]],
    });
    effect(() => {
      if (this.success()) {
        this._messageService.add({
          severity: 'success',
          summary: 'Todo correcto!',
          detail: 'La publicacion se ha publicado correctamente',
        });
      }
    });
  }

  ngOnInit() {
    this._messageSuccess.setFalse();
    this.success = this._messageSuccess.getSuccess();
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
