import { Observable } from "rxjs";
import { VoiceRoom } from "../models/voice_room.model";

export abstract class VoiceRoomRepository{
    abstract getVoiceRoom(user_id:string):Observable<VoiceRoom[]>;
}