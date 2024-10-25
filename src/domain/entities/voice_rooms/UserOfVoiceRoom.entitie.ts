import { UserResponseVoiceRoom } from './IHostUser.entitie';

export class UserOfVoiceRoom {
  constructor(
    private id: number,
    private user_information_voice_room: UserResponseVoiceRoom
  ) {}

  getUsername(): string {
    return this.user_information_voice_room.username;
  }

  getProfilePicture(): string {
    return this.user_information_voice_room.profile_picture;
  }

  getIDUser(): number {
    return this.user_information_voice_room.id;
  }
}
