import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import AgoraRTC from 'agora-rtc-sdk-ng';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  rtc: any = {
    localAudioTrack: null,
    client: null,
  };
  options: any = {
    appId: '7bdd37c21f3649adb2fc6056b4c6c62a',
    token: null,
  };

  setOptions(chanel: string, uid: string) {
    this.options.channel = chanel;
    this.options.uid = uid;
  }

  constructor(private _destroyRef:DestroyRef) {
    AgoraRTC.setLogLevel(4); // Opciones: "none", "error", "warning", "info", "debug"
    this.rtc.client = AgoraRTC.createClient({
      mode: 'rtc',
      codec: 'vp8',
      websocketRetryConfig: {
        timeout: 10,
        timeoutFactor: 0,
        maxRetryCount: 1,
        maxRetryTimeout: 2000,
      },
    });
  }

  async initializeClient(
    room_id: string | null,
    username: string
  ): Promise<void> {
    await this.rtc.client.join(
      this.options.appId,
      room_id,
      this.options.token,
      username
    );
    this.rtc.client.on('user-published', async (user: any, mediaType: any) => {
      await this.rtc.client.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(user, mediaType);
      if (mediaType === 'audio') {
        user.audioTrack.play();
      }
    });

    this.rtc.client.on('user-unpublished', (user: any) => {
      const remotePlayerContainer = document.getElementById(user.uid);
      if (remotePlayerContainer) {
        remotePlayerContainer.remove();
      }
    });
  }

  async joinCall(): Promise<void> {

    // Verifica si ya estamos conectados
    if (this.rtc.client.localUid) {
      console.log('Ya estás conectado');
      return; // Ya estamos conectados, no hacemos nada
    }

    // Crear el track de audio
    this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();

    // Publicar el track solo después de haber entrado a la sala
    await this.rtc.client.publish([this.rtc.localAudioTrack]);
  }

  async leaveCall() {

    // Verifica si ya estamos desconectados
    if (this.rtc.client) {
      await this.rtc.client.leave();
    }

    // Cierra el track de audio solo después de que se haya dejado la llamada
    if (this.rtc.localAudioTrack) {
      this.rtc.localAudioTrack.close();
    }
  }

  toggleAudio(micOn: boolean) {
    if (micOn) {
      console.log('Se prendio');
    } else {
      console.log('Se apago');
    }
    this.rtc.localAudioTrack.setEnabled(micOn);
  }
}
