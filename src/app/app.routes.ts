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
  // The pages are now top-level routes without the "/tabs/" prefix
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'explore',
    loadComponent: () =>
      import('./pages/explore/explore.page').then((m) => m.ExplorePage),
  },
  {
    path: 'wardrobe',
    loadComponent: () =>
      import('./pages/wardrobe/wardrobe.page').then((m) => m.WardrobePage),
  },
  {
    path: 'outfit',
    loadComponent: () =>
      import('./pages/outfit/outfit.page').then((m) => m.OutfitPage),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },
];
