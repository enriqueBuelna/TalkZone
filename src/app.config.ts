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
import { UserPreferenceRepository } from './domain/repositories/user_preferences.repository';
import { RemoteUserPreferenceRespository } from './data/repositories/remote_user_preference.repository';
import { MessageRepository } from './domain/repositories/message.repository';
import { RemoteMessageRepository } from './data/repositories/remote_message.repository';
import { PostRepository } from './domain/repositories/post.repository';
import { RemotePostRespository } from './data/repositories/remote_post.repository';
import { CommunitieRepository } from './domain/repositories/communitie.repository';
import { RemoteComunitieRepository } from './data/repositories/remote_comunitie.repository';
import { NotificationRepository } from './domain/repositories/notifications.repository';
import { RemoteNotificationRepository } from './data/repositories/remote_notifications.repository';
import { FollowerRepository } from './domain/repositories/follower.repository';
import { RemoteFollowerRepository } from './data/repositories/remote_follower.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: UserRepository, useClass: RemoteUserRepository },
    { provide: TopicRepository, useClass: RemoteTopicRepository },
    { provide: TagRepository, useClass: RemoteTagRespository },
    { provide: VoiceRoomRepository, useClass: RemoteVoiceRoomRepository },
    {
      provide: UserPreferenceRepository,
      useClass: RemoteUserPreferenceRespository,
    },
    { provide: MessageRepository, useClass: RemoteMessageRepository },
    { provide: PostRepository, useClass: RemotePostRespository },
    { provide: CommunitieRepository, useClass: RemoteComunitieRepository },
    { provide: NotificationRepository, useClass: RemoteNotificationRepository },
    { provide: FollowerRepository, useClass: RemoteFollowerRepository },
    provideAnimationsAsync(),
  ],
};
