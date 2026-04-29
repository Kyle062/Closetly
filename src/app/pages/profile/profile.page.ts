import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import {
  IonContent,
  IonIcon,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  optionsOutline,
  pencilOutline,
  copyOutline,
  briefcaseOutline,
  shirtOutline,
  bookmarkOutline,
  ribbonOutline,
  calendarOutline,
  cubeOutline,
  heartOutline,
  settingsOutline,
  helpCircleOutline,
  logOutOutline,
  chevronForwardOutline,
  arrowBackOutline,
  personOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, BottomNavComponent, CommonModule, FormsModule],
})
export class ProfilePage implements OnInit {
  menuItems = [
    {
      label: 'Saved Outfits',
      icon: 'ribbon-outline',
      color: '#ffcc00',
      route: '/outfit',
    },
    {
      label: 'Outfit Calendar',
      icon: 'calendar-outline',
      color: '#ff5e5e',
      route: '/outfit-calendar',
    },
    {
      label: 'Packing List',
      icon: 'cube-outline',
      color: '#ffbd8a',
      route: '/packing-list',
    },
    {
      label: 'Wishlist',
      icon: 'heart-outline',
      color: '#ff5e5e',
      route: '/wishlist',
    },
    {
      label: 'Settings',
      icon: 'settings-outline',
      color: '#333',
      route: '/settings',
    },
    {
      label: 'About Us',
      icon: 'help-circle-outline',
      color: '#333',
      route: '/about-us',
    },
  ];

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      optionsOutline,
      pencilOutline,
      copyOutline,
      briefcaseOutline,
      shirtOutline,
      bookmarkOutline,
      ribbonOutline,
      calendarOutline,
      cubeOutline,
      heartOutline,
      settingsOutline,
      helpCircleOutline,
      logOutOutline,
      chevronForwardOutline,
      arrowBackOutline,
      personOutline,
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/home']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      mode: 'ios',
      cssClass: 'modern-pill-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Logout',
          handler: () => {
            console.log('Logging out...');
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }
}
