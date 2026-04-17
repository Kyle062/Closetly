import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash1',
    pathMatch: 'full',
  },
  {
    path: 'splash1',
    loadComponent: () =>
      import('./splash1/splash1.page').then((m) => m.Splash1Page),
  },
  {
    path: 'splash4',
    loadComponent: () =>
      import('./splash4/splash4.page').then((m) => m.Splash4Page),
  },
  // Add routes for login and signup here when ready [cite: 77, 78]
];
