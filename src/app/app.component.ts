
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ActividadListaComponent } from './admin/components/actividad-lista/actividad-lista.component';
import { AdminModule } from './admin/admin.module';


@Component({
  selector: 'app-root',

  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
  ], // Importa BrowserModule solo en main.ts
    
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'AnalisisPU-App';
}
