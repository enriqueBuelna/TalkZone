import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './ui/pages/app/app.routes';
import { UserRepository } from './domain/repositories/user.repository';
import { RemoteUserRepository } from './data/repositories/remote_user.repository';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient() , { provide:UserRepository, useClass: RemoteUserRepository}]
};

