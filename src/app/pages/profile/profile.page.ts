import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonIcon, IonRippleEffect, IonList, IonItem, IonLabel 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  menuOutline, pencilOutline, copyOutline, briefcaseOutline, 
  shirtOutline, bookmarkOutline, ribbonOutline, calendarOutline, 
  cubeOutline, heartOutline, settingsOutline, helpCircleOutline, 
  logOutOutline, chevronForwardOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonIcon, IonRippleEffect, IonList, 
    IonItem, IonLabel, CommonModule, FormsModule
  ]
})
export class ProfilePage implements OnInit {

  menuItems = [
    { label: 'Saved Outfits', icon: 'ribbon-outline', color: '#ffcc00' },
    { label: 'Outfit Calendar', icon: 'calendar-outline', color: '#ff5e5e' },
    { label: 'Packing List', icon: 'cube-outline', color: '#ffbd8a' },
    { label: 'Wishlist', icon: 'heart-outline', color: '#ff5e5e' },
    { label: 'Settings', icon: 'settings-outline', color: '#333' },
    { label: 'Help', icon: 'help-circle-outline', color: '#333' },
  ];

  constructor() {
    addIcons({ 
      menuOutline, pencilOutline, copyOutline, briefcaseOutline, 
      shirtOutline, bookmarkOutline, ribbonOutline, calendarOutline, 
      cubeOutline, heartOutline, settingsOutline, helpCircleOutline, 
      logOutOutline, chevronForwardOutline 
    });
  }

  ngOnInit() {}

  logout() {
    console.log('Logging out...');
  }
}