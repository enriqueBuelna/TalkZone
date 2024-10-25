import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { UserRepository } from './domain/repositories/user.repository';
import { RemoteUserRepository } from './data/repositories/remote_user.repository';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TopicRepository } from './domain/repositories/topic.repository';
import { RemoteTopicRepository } from './data/repositories/remote_topic.repository';
import { TagRepository } from './domain/repositories/tag.repository';
import { RemoteTagRespository } from './data/repositories/remote_tag.repository';
import { VoiceRoomRepository } from './domain/repositories/voice_room.repository';
import { RemoteVoiceRoomRepository } from './data/repositories/remote_voice_room.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: UserRepository, useClass: RemoteUserRepository },
    { provide: TopicRepository, useClass: RemoteTopicRepository },
    { provide: TagRepository, useClass: RemoteTagRespository },
    { provide: VoiceRoomRepository, useClass: RemoteVoiceRoomRepository },
    provideAnimationsAsync(),
  ],
};
