import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadListaComponent } from './components/actividad-lista/actividad-lista.component';
import { ElementosListaComponent } from './components/elementos-lista/elementos-lista.component';
import { ActividadEditarComponent } from './components/actividad-editar/actividad-editar.component';
import ActividadAgregarComponent from './components/actividad-agregar/actividad-agregar.component';

import { ElementoAgregarComponent } from './components/elemento-agregar/elemento-agregar.component';
import { ElementoEditarComponent } from './components/elemento-editar/elemento-editar.component';
import { ActividadDetalleComponent } from './components/actividad-detalle/actividad-detalle.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { ActividadAsignarElementoComponent } from './components/actividad-asignar-elemento/actividad-asignar-elemento.component';
import { ApuEditarComponent } from './components/apu-editar/apu-editar.component';

// http://localhost:4200/actividades
const routes: Routes = [
  {path:'actividades', component: ActividadListaComponent},
  {path:'',redirectTo: 'actividades',pathMatch:'full'},
  {path:'agregar-actividad', component: ActividadAgregarComponent},
  {path:'actividad-detalle/:id', component: ActividadDetalleComponent},
  {path:'actividad-editar/:id', component: ActividadEditarComponent},

  {path:'elementos', component: ElementosListaComponent},
  {path:'agregar-elemento', component: ElementoAgregarComponent},
  {path:'editar-elemento/:id', component: ElementoEditarComponent},
  //{path:'asignar-elemento/:id', component: ActividadAsignarElementoComponent},
  {path:'resumen', component: ResumenComponent},
  {path:'apu-editar/:id', component: ApuEditarComponent},
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
