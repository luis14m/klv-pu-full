
import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '', redirectTo: 'admin', pathMatch: 'full' }

  
  
];

