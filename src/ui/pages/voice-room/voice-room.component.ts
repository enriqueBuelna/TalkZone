import { Component, DestroyRef, OnInit, signal } from '@angular/core';
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
import { Dialog, DialogModule } from 'primeng/dialog';
import { ScrollerModule } from 'primeng/scroller';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
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
    DialogModule,
    ReactiveFormsModule,
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
  formCreateVR!: FormGroup;
  modalCreate = signal(false);

  constructor(
    private _userService: UserService,
    private _voiceRoomService: VoiceRoomService,
    private _destroyRef: DestroyRef,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.formCreateVR = this._formBuilder.group({
      room_name: ['', [Validators.required]],
      topic_id: ['', [Validators.required]],
    });
  }

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
  }

  createVoiceRoom() {
    if (this.formCreateVR.valid) {
      let { room_name, topic_id } = this.formCreateVR.value;

      this._voiceRoomService
        .createVoiceRoom(room_name, this._userService.getUserId(), topic_id)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((el) => {
          this._router.navigate(['/voice_room', el.id]);
        });
    }
  }

  openDialog() {
    this.modalCreate.set(true);
  }

  joinRoom(room_id: number) {
    this._router.navigate(['/voice_room', room_id]);
  }
}
