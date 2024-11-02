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
export const routes: Routes = [
  // Ruta para la autenticación, antes de iniciar sesión
  { path: '', component: AuthComponent },
  // Ruta para el layout con las rutas hijas
  {
    path: 'home',
    component: HomeComponent,
    children: [
      // { path: '', component: VoiceRoomComponent },
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'voice_chats',
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
    ],
    canActivate: [authGuard]
  },

  // Ruta wildcard para redirigir
  // { path: '**', redirectTo: '' }
];
