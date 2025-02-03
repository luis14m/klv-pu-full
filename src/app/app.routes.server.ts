import { Route } from '@angular/router';
import { PrerenderMode } from '@angular/platform-server'; // Correct module for PrerenderMode

export const serverRoutes: Route[] = [
  {
    renderMode: PrerenderMode.Prerender // Removed as it does not exist in Route type
   
  }
];
