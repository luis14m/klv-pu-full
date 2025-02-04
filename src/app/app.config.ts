import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

//Para emplear la estrategia de localizacion de URL Hash y no la que es por defecto HTML5statepush "withHashLocation"
import { provideRouter, withHashLocation  } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';




export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
  provideRouter(routes, withHashLocation()), provideHttpClient()]
};
