import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  searchOutline,
  shirtOutline,
  gridOutline,
  personOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
})
export class BottomNavComponent {
  constructor() {
    addIcons({
      homeOutline,
      searchOutline,
      shirtOutline,
      gridOutline,
      personOutline,
    });
  }
}
