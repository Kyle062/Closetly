import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonInput,
  IonAvatar,
  IonButton,
  IonLabel,
  IonItem,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  gridOutline,
  searchOutline,
  scanOutline,
  optionsOutline,
  cloudyOutline,
  shirtOutline, sunnyOutline, addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  // Add all used components to this array
  imports: [
    IonContent,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonInput,
    IonAvatar,
    IonButton,
    IonLabel,
    IonItem,
  ],
})
export class HomePage {
  constructor() {
    // Register the icons specifically for the Home Page
    addIcons({searchOutline,scanOutline,optionsOutline,cloudyOutline,sunnyOutline,shirtOutline,addOutline,gridOutline,});
  }
}
