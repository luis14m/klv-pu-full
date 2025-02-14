import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    //provideHttpClient(withFetch()),  // Habilita fetch API
    provideRouter(routes) // No usar { useHash: true }
  ],
}).catch(err => console.error(err));