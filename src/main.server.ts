import 'zone.js/node';
import { provideServerRendering } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

// Bootstrap de la aplicación en modo servidor
export function bootstrap() {
  return bootstrapApplication(AppComponent, {
    providers: [
      provideServerRendering(), // Habilita SSR
      provideRouter(routes),    // Configura rutas standalone
      provideHttpClient()       // Habilita HTTP Client en el servidor
    ]
  });
}

// Exportar bootstrap y `AppComponent` para la configuración SSR
export default bootstrap;
