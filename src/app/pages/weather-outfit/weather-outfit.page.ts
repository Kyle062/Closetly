import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  partlySunnyOutline,
  rainyOutline,
  sunnyOutline,
  snowOutline,
  optionsOutline,
  scanOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-weather-outfit',
  templateUrl: './weather-outfit.page.html',
  styleUrls: ['./weather-outfit.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonButton,
    CommonModule,
    FormsModule,
  ],
})
export class WeatherOutfitPage implements OnInit {
  constructor() {
    // Register the icons used in the template
    addIcons({
      arrowBackOutline,
      partlySunnyOutline,
      rainyOutline,
      sunnyOutline,
      snowOutline,
      optionsOutline,
      scanOutline,
    });
  }

  ngOnInit() {}
}
