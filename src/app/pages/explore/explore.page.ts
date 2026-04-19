import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  optionsOutline,
  searchOutline,
  addOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonFab,
    IonFabButton,
    CommonModule,
    FormsModule,
  ],
})
export class ExplorePage implements OnInit {
  constructor() {
    // Register the icons used in the template
    addIcons({
      arrowBackOutline,
      optionsOutline,
      searchOutline,
      addOutline,
    });
  }

  ngOnInit() {}
}
