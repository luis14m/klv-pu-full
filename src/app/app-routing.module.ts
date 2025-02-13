
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) // Carga el módulo admin
  },
  { path: '', redirectTo: 'admin/actividades', pathMatch: 'full' }, // Ruta por defecto

/*   { path: '**', redirectTo: 'admin/actividades' }, // Redirige a la lista si la ruta no existe */ */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}