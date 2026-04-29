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
  {
    path: 'weather-outfit',
    loadComponent: () => import('./pages/weather-outfit/weather-outfit.page').then( m => m.WeatherOutfitPage)
  },
  {
    path: 'random-outfit',
    loadComponent: () => import('./pages/random-outfit/random-outfit.page').then( m => m.RandomOutfitPage)
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'add-item',
    loadComponent: () => import('./pages/add-item/add-item.page').then( m => m.AddItemPage)
  },
  {
    path: 'outfit-calendar',
    loadComponent: () => import('./pages/outfit-calendar/outfit-calendar.page').then( m => m.OutfitCalendarPage)
  },
  {
    path: 'packing-list',
    loadComponent: () => import('./pages/packing-list/packing-list.page').then( m => m.PackingListPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'about-us',
    loadComponent: () => import('./pages/about-us/about-us.page').then( m => m.AboutUsPage)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/wishlist/wishlist.page').then( m => m.WishlistPage)
  },
];
