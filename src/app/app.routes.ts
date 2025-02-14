
import { Routes } from '@angular/router';

import { ActividadDetalleComponent } from './admin/components/actividad-detalle/actividad-detalle.component';
import { ActividadEditarComponent } from './admin/components/actividad-editar/actividad-editar.component';
import { ActividadListaComponent } from './admin/components/actividad-lista/actividad-lista.component';

import { ElementoAgregarComponent } from './admin/components/elemento-agregar/elemento-agregar.component';
import { ElementoEditarComponent } from './admin/components/elemento-editar/elemento-editar.component';
import { ElementosListaComponent } from './admin/components/elementos-lista/elementos-lista.component';
import { ResumenComponent } from './admin/components/resumen/resumen.component';

import { ActividadAgregarComponent } from './admin/components/actividad-agregar/actividad-agregar.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'actividades', component:ActividadListaComponent },

      { path: 'elementos', component: ElementosListaComponent },
      { path: 'actividad-agregar', component: ActividadAgregarComponent },
      { path: 'elemento-agregar', component: ElementoAgregarComponent },
      { path: 'actividad-detalle/:id', component: ActividadDetalleComponent },
      { path: 'resumen', component: ResumenComponent },
      { path: 'actividad-editar/:id', component: ActividadEditarComponent },
      { path: 'elemento-editar/:id', component: ElementoEditarComponent },
      
      
    ]
  },
  { path: '', redirectTo: '/admin/actividades', pathMatch: 'full' }, // Ruta por defecto

];