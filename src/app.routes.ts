import { Routes } from '@angular/router';
import { AppComponent } from './ui/pages/app/app.component';
import { AuthComponent } from './ui/pages/auth/auth.component';
import { WelcomeComponent } from './ui/pages/welcome/welcome.component';
import { HomeComponent } from './ui/pages/home/home.component';
import { VoiceRoomComponent } from './ui/pages/voice-room/voice-room.component';
import { adminGuard, authGuard, isVerify } from './guards/auth-guard.guard';
import { ConnectComponent } from './ui/pages/connect/connect.component';
import { MessagesComponent } from './ui/pages/messages/messages.component';
import { MessageRigthComponent } from './ui/pages/messages/message-rigth/message-rigth.component';
import { RoomContainerComponent } from './ui/pages/voice-room/voice-room-in/room-container/room-container.component';
import { MyFeedComponent } from './ui/pages/my-feed/my-feed.component';
import { Component } from '@angular/core';
import { DetailPostComponent } from './ui/pages/my-feed/detail-post/detail-post.component';
import { ForYouComponent } from './ui/pages/my-feed/for-you/for-you.component';
import { MyProfileComponent } from './ui/pages/my-profile/my-profile.component';
import { GroupComponent } from './ui/pages/group/group.component';
import { WelcomeGroupComponent } from './ui/pages/group/welcome-group/welcome-group.component';
import { DiscoverGroupsComponent } from './ui/pages/group/discover-groups/discover-groups.component';
import { GroupSkeletonComponent } from './ui/pages/group/group-skeleton/group-skeleton.component';
import { MyGroupsComponent } from './ui/pages/group/my-groups/my-groups.component';
import { MyFeedGroupComponent } from './ui/pages/group/my-feed/my-feed.component';
import { ViewOfGroupComponent } from './ui/pages/group/view-of-group/view-of-group.component';
import { NotificationsComponent } from './ui/pages/notifications/notifications.component';
import { ConfigurationComponent } from './ui/pages/configuration/configuration.component';
import { SearchGroupComponent } from './ui/pages/group/search-group/search-group.component';
import { SearchPostComponent } from './ui/pages/my-feed/search-post/search-post.component';
import { AdminCoreComponent } from './ui/admin/admin-core/admin-core.component';
import { PrincipalAdminComponent } from './ui/admin/principal-admin/principal-admin.component';
import { AdminUsersComponent } from './ui/admin/admin-users/admin-users.component';
import { AdminGroupsComponent } from './ui/admin/admin-groups/admin-groups.component';
import { AdminReportsComponent } from './ui/admin/admin-reports/admin-reports.component';
import { AdminAllUsersComponent } from './ui/admin/admin-users/admin-all-users/admin-all-users.component';
import { AdminMoreFollowersComponent } from './ui/admin/admin-users/admin-more-followers/admin-more-followers.component';
import { AdminDetailUserComponent } from './ui/admin/admin-users/admin-detail-user/admin-detail-user.component';
import { ModerationReportsComponent } from './ui/admin/admin-users/admin-user-problems/admin-user-problems.component';
import { UserCardStatsComponent } from './ui/admin/admin-users/admin-detail-user/user-card-stats/user-card-stats.component';
import { GroupCardStatsComponent } from './ui/admin/admin-groups/group-card-stats/group-card-stats.component';
import { IsBannedComponent } from './ui/pages/banned/is-banned/is-banned.component';
export const routes: Routes = [
  // Ruta para la autenticación, antes de iniciar sesión
  { path: '', component: AuthComponent, canActivate: [isVerify] },
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
            path: 'detail_post/:id',
            component: DetailPostComponent,
          },
          {
            path: 'search/:post_content',
            component: SearchPostComponent,
          },
        ],
      },
      { path: 'posts/:id', redirectTo: 'posts', pathMatch: 'full' }, // Redirige si se detecta un ,
      // { path: '', component: VoiceRoomComponent },
      { path: 'welcome', component: WelcomeComponent },
      {
        path: 'voice_room',
        component: VoiceRoomComponent,
      },
      { path: 'voice_room/:id', redirectTo: 'voice_room', pathMatch: 'full' }, // Redirige si se detecta un parámetro no esperado
      {
        path: 'connect',
        component: ConnectComponent,
        // children: [
        //   {
        //     path: 'search', component: SearchConnectComponent
        //   }
        // ]
      },
      {
        path: 'messages',
        component: MessagesComponent,
        children: [{ path: ':user_id', component: MessageRigthComponent }],
      },
      {
        path: 'profile/:user_id',
        component: MyProfileComponent,
      },
      {
        path: 'groups',
        component: GroupComponent,
        children: [
          { path: 'welcome', component: WelcomeGroupComponent },
          {
            path: '',
            component: GroupSkeletonComponent,
            children: [
              { path: '', component: DiscoverGroupsComponent },
              { path: 'search/:group_name', component: SearchGroupComponent },
              { path: 'my-feed', component: MyFeedGroupComponent },
              { path: 'my-groups', component: MyGroupsComponent },
            ],
          },
          { path: ':id', component: ViewOfGroupComponent },
        ],
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'configuration',
        component: ConfigurationComponent,
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminCoreComponent,
    children: [
      { path: '', component: PrincipalAdminComponent },
      {
        path: 'users',
        component: AdminUsersComponent,
        children: [
          { path: 'all-users', component: AdminAllUsersComponent },
          { path: 'more-followers', component: AdminMoreFollowersComponent },
          {
            path: 'detail-user',
            component: AdminDetailUserComponent,
            children: [{ path: ':user_id', component: UserCardStatsComponent }],
          },
          { path: 'user-problems', component: ModerationReportsComponent },
        ],
      },
      {
        path: 'groups',
        component: AdminGroupsComponent,
        children: [
          { path: ':detail-group', component: GroupCardStatsComponent },
        ],
      },
      { path: 'reports', component: AdminReportsComponent },
    ],
    canActivate: [adminGuard],
  },
  { path: 'voice_room/:room_id', component: RoomContainerComponent },
  {
    path: 'banned', component: IsBannedComponent
  }
  // Ruta wildcard para redirigir
  // { path: '**', redirectTo: '' }
];
