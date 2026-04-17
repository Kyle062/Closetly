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
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.page').then((m) => m.SignupPage),
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage)
  },
];
