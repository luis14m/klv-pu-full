import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, AppComponent], // Importa RouterModule para usar <router-outlet>
  templateUrl: './admin.component.html'
})
export class AdminComponent {}