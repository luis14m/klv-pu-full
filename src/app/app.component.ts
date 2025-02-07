
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Actividad } from './models/actividad';
import { ActividadListaComponent } from './components/actividad-lista/actividad-lista.component';


@Component({
  selector: 'app-root',

  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive], // Importa BrowserModule solo en main.ts
    
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'AnalisisPU-App';
}
