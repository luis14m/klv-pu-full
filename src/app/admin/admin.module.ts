import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActividadListaComponent } from './components/actividad-lista/actividad-lista.component';
import ActividadAgregarComponent from './components/actividad-agregar/actividad-agregar.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule, // Importa CommonModule para usar directivas como *ngIf y *ngFor
    FormsModule, // 
    RouterModule,
    AdminRoutingModule,
    
  ]

})
export class AdminModule { }
