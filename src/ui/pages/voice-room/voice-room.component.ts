import { Component, OnInit } from '@angular/core';
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
import { map } from 'rxjs';
import { UserOfVoiceRoom } from '../../../domain/entities/voice_rooms/UserOfVoiceRoom.entitie';
import { VoiceRoomToVoiceRoomTag } from '../../../domain/entities/voice_rooms/VoiceRoomToVoiceRoomTag.entitie';
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
    private _voiceRoomService: VoiceRoomService
  ) {}

  ngOnInit() {
    this.responseAllVoiceRoom$ = this._voiceRoomService
      .getVoiceRoom(this._userService.getUserId())
      .pipe(
        map((rooms: any[]) =>
          rooms.map(
            (room) =>
              new VoiceRoom(
                room.id,
                room.room_name,
                room.users_of_voice_room.map(
                  (user: any) =>
                    new UserOfVoiceRoom(
                      user.id, // El ID de la sala de voz
                      {
                        username: user.user_information_voice_room.username,
                        profile_picture:
                          user.user_information_voice_room.profile_picture,
                        id: user.user_information_voice_room.id,
                      }
                    )
                ),
                room.topic_id,
                room.topic.topic_name,
                room.voice_room_to_voice_room_tag.map(
                  (tag: any) =>
                    new VoiceRoomToVoiceRoomTag(
                      tag.id,
                      tag.voice_room_tag_to_tag.tag_name
                    )
                ),
                room.host_user
              )
          )
        )
      );

    this.responseAllVoiceRoom$.subscribe((el) => {
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
