import { Component } from '@angular/core';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
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
  shirtOutline,
  sunnyOutline,
  addOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [BottomNavComponent, IonContent, IonIcon, IonInput, IonAvatar, IonButton],
})
export class HomePage {
  constructor() {
    addIcons({
      searchOutline,
      scanOutline,
      optionsOutline,
      cloudyOutline,
      sunnyOutline,
      shirtOutline,
      addOutline,
      gridOutline,
    });
  }
}
