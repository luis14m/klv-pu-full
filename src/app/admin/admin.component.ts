import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  template: `<router-outlet></router-outlet>`, // Solo si no hay más contenido
  standalone: true,
  imports: [RouterOutlet]
})
export class AdminComponent {}