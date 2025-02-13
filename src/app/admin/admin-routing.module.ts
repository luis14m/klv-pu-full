import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActividadDetalleComponent } from './components/actividad-detalle/actividad-detalle.component';
import { ActividadEditarComponent } from './components/actividad-editar/actividad-editar.component';
import { ActividadListaComponent } from './components/actividad-lista/actividad-lista.component';

import { ElementoAgregarComponent } from './components/elemento-agregar/elemento-agregar.component';
import { ElementoEditarComponent } from './components/elemento-editar/elemento-editar.component';
import { ElementosListaComponent } from './components/elementos-lista/elementos-lista.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { ActividadAsignarElementoComponent } from './components/actividad-asignar-elemento/actividad-asignar-elemento.component';
import ActividadAgregarComponent from './components/actividad-agregar/actividad-agregar.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [

  //{path:'admin',redirectTo: 'actividades',pathMatch:'full'},
  {path:'admin/actividades', component: ActividadListaComponent},
  {path:'admin/elementos', component: ElementosListaComponent},
  {path:'admin/agregar-actividad', component: ActividadAgregarComponent},
  {path:'admin/agregar-elemento', component: ElementoAgregarComponent},
  {path:'admin/actividad-detalle/:id', component: ActividadDetalleComponent},
  {path:'apu/resumen', component: ResumenComponent},
 /*  { path: '**', redirectTo: 'admin/actividades' }, // Redirige a la lista si la ruta no existe */
  {path:'asignar-elemento/:id', component: ActividadAsignarElementoComponent},
  {path:'admin/actividad-editar/:id', component: ActividadEditarComponent},
  {path:'admin/elemento-editar/:id', component: ElementoEditarComponent},
 
/* 
 
  
  
  
  
  {path:'apu-editar/:id', component: ApuEditarComponent}, */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
