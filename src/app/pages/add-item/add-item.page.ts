import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  optionsOutline,
  cameraOutline,
  cloudUploadOutline,
  chevronDownOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, CommonModule, FormsModule],
})
export class AddItemPage implements OnInit {
  constructor() {
    // Register the icons used in the template
    addIcons({
      arrowBackOutline,
      optionsOutline,
      cameraOutline,
      cloudUploadOutline,
      chevronDownOutline,
    });
  }

  ngOnInit() {}
}
