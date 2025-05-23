import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './ui/pages/app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
