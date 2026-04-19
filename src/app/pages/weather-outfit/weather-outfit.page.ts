import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-weather-outfit',
  templateUrl: './weather-outfit.page.html',
  styleUrls: ['./weather-outfit.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WeatherOutfitPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
