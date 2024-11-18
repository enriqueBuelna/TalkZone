import { Routes } from '@angular/router';
import { AppComponent } from './ui/pages/app/app.component';
import { AuthComponent } from './ui/pages/auth/auth.component';
import { WelcomeComponent } from './ui/pages/welcome/welcome.component';
import { HomeComponent } from './ui/pages/home/home.component';
import { VoiceRoomComponent } from './ui/pages/voice-room/voice-room.component';
import { authGuard } from './guards/auth-guard.guard';
import { ConnectComponent } from './ui/pages/connect/connect.component';
import { MessagesComponent } from './ui/pages/messages/messages.component';
import { MessageRigthComponent } from './ui/pages/messages/message-rigth/message-rigth.component';
import { RoomContainerComponent } from './ui/pages/voice-room/voice-room-in/room-container/room-container.component';
import { MyFeedComponent } from './ui/pages/my-feed/my-feed.component';
import { Component } from '@angular/core';
import { DetailPostComponent } from './ui/pages/my-feed/detail-post/detail-post.component';
import { ForYouComponent } from './ui/pages/my-feed/for-you/for-you.component';
import { MyProfileComponent } from './ui/pages/my-profile/my-profile.component';
export const routes: Routes = [
  // Ruta para la autenticación, antes de iniciar sesión
  { path: '', component: AuthComponent },
  // Ruta para el layout con las rutas hijas
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'posts',
        component: MyFeedComponent,
        children: [
          {
            path: '',
            component: ForYouComponent,
          },
          {
            path:'detail_post/:id',
            component: DetailPostComponent
          }
        ],
      },
      // { path: '', component: VoiceRoomComponent },
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'voice_room',
        component: VoiceRoomComponent,
      },
      {
        path: 'connect',
        component: ConnectComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
        children: [{ path: ':user_id', component: MessageRigthComponent }],
      },
      {
        path: 'profile/:user_id',
        component: MyProfileComponent
      }
    ],
    canActivate: [authGuard],
  },
  { path: 'voice_room/:room_id', component: RoomContainerComponent },
  // Ruta wildcard para redirigir
  // { path: '**', redirectTo: '' }
];
