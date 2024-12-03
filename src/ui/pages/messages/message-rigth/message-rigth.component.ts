import {
  Component,
  DestroyRef,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { HeaderComponent } from '../../../utils/header/header.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageComponentService } from './services/message-component.service';
import { map, Observable, takeUntil } from 'rxjs';
import { UserDemo } from '../../../../domain/models/user-demo.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../../domain/services/auth.service';
import { UserService } from '../../auth/services/user.service';
import { ChatService } from '../services/chatService.service';
@Component({
  selector: 'app-message-rigth',
  standalone: true,
  imports: [HeaderComponent, ChatContainerComponent],
  templateUrl: './message-rigth.component.html',
  styleUrl: './message-rigth.component.css',
})
export class MessageRigthComponent implements OnInit, OnDestroy {
  responseGetBasicInfo?: Observable<UserDemo>;
  // userDemoInfo = signal<UserDemo>;
  userDemoInfo?: UserDemo;
  userNotFound = false;
  constructor(
    private route: ActivatedRoute,
    private _messageCService: MessageComponentService,
    private _userService: AuthService,
    private _destroyRef: DestroyRef,
    private _userrService: UserService,
    private _router:Router,
    private _chatService:ChatService
  ) {}
  //ocupo encontrar el user_information
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('user_id') || '';
      this._chatService.setAmHereId(userId);
      if(userId !== this._userrService.getUserId()){
        if (userId) {
          console.log('chivo');
          // Realiza la solicitud cada vez que cambie el parámetro 'user_id'
          this.responseGetBasicInfo = this._userService.getBasicInfo(userId);
  
          // Suscríbete para actualizar la información del usuario
          this.responseGetBasicInfo
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
              next: (el) => {
                this.userNotFound = false;
                this._messageCService.setUser(el);
                this.userDemoInfo = this._messageCService.getUser();
              },
              error: (error) => {
                this.userNotFound = true;
              }
            });
        }
      }else{
        this._router.navigate(['home','messages']);
      }
    });
  }

  ngOnDestroy(): void {
    this._chatService.setAmHereId('');
  }
}