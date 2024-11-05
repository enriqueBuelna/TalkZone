import { Component, DestroyRef, OnInit } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { AsideComponent } from '../../utils/aside/aside.component';
import { ButtonComponent } from '../../utils/button/button.component';
import { CardComponent } from '../../utils/card/card.component';
import { ChipModule } from 'primeng/chip';
import { UserService } from '../auth/services/user.service';
import { VoiceRoomService } from '../../../domain/services/voice_room.service';
import { Observable } from 'rxjs';
import { VoiceRoom } from '../../../domain/models/voice_room.model';
import { CommonModule } from '@angular/common';
import { OrderListModule } from 'primeng/orderlist';
import { UserOfVoiceRoom } from '../../../domain/entities/voice_rooms/UserOfVoiceRoom.entitie';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ScrollerModule } from 'primeng/scroller';
@Component({
  selector: 'app-voice-room',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    AsideComponent,
    ButtonComponent,
    CardComponent,
    ChipModule,
    OrderListModule,
    ScrollerModule,
  ],
  templateUrl: './voice-room.component.html',
  styleUrl: './voice-room.component.css',
})
export class VoiceRoomComponent implements OnInit {
  responseAllVoiceRoom$?: Observable<VoiceRoom[]>;
  allVoiceRooms: VoiceRoom[] = [];
  ifVrChoosen: boolean = false;
  vrChoosen?: VoiceRoom;
  integrantsVr: UserOfVoiceRoom[] = [];

  constructor(
    private _userService: UserService,
    private _voiceRoomService: VoiceRoomService,
    private _destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.responseAllVoiceRoom$ = this._voiceRoomService.getVoiceRoom(
      this._userService.getUserId()
    );

    this.responseAllVoiceRoom$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((el) => {
        this.allVoiceRooms = el;
      });
  }

  siFunciona(vr: VoiceRoom) {
    this.vrChoosen = vr;
    this.integrantsVr = this.vrChoosen.getUsers();
    this.integrantsVr.forEach((el) => {
      console.log(el.getUsername());
    });
  }
}
