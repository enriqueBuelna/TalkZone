import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../auth/services/user.service';
import { VoiceRoomService } from '../../../../../../domain/services/voice_room.service';
import { voiceRoomSocket } from '../../../../../../socket_service/voice_room_socket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class RatingComponent {
  stars: number[] = [1, 2, 3, 4, 5];
  rating: number = 0;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _voiceRoomService: VoiceRoomService,
    private _destroyRef: DestroyRef
  ) {}
  // Establece la calificación
  setRating(value: number): void {
    this.rating = value;
  }
  // Limpia la calificación actual
  goToHome(): void {
    this._router.navigate(['home', 'voice_room']);
  }
  // Envía la calificación
  submitRating(): void {
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';

    this._voiceRoomService.addRating(
      roomId,
      this.rating,
      this._userService.getUserId()
    ).pipe(takeUntilDestroyed(this._destroyRef)).subscribe(el => {
      if(el){
        this.goToHome();
      }
    });
  }
}
