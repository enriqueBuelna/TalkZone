import {
  Component,
  DestroyRef,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { HeaderComponent } from '../../../utils/header/header.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ActivatedRoute } from '@angular/router';
import { MessageComponentService } from './services/message-component.service';
import { map, Observable, takeUntil } from 'rxjs';
import { UserDemo } from '../../../../domain/models/user-demo.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../../domain/services/auth.service';
@Component({
  selector: 'app-message-rigth',
  standalone: true,
  imports: [HeaderComponent, ChatContainerComponent],
  templateUrl: './message-rigth.component.html',
  styleUrl: './message-rigth.component.css',
})
export class MessageRigthComponent implements OnInit {
  responseGetBasicInfo?: Observable<UserDemo>;
  // userDemoInfo = signal<UserDemo>;
  userDemoInfo?: UserDemo;
  constructor(
    private route: ActivatedRoute,
    private _messageCService: MessageComponentService,
    private _userService: AuthService,
    private _destroyRef: DestroyRef
  ) {}
  //ocupo encontrar el user_information
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('user_id') || '';
      if (userId) {
        // Realiza la solicitud cada vez que cambie el parámetro 'user_id'
        this.responseGetBasicInfo = this._userService.getBasicInfo(userId);

        // Suscríbete para actualizar la información del usuario
        this.responseGetBasicInfo
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((el) => {
            this._messageCService.setUser(el);
            this.userDemoInfo = this._messageCService.getUser();
          });
      }
    });
  }
}
