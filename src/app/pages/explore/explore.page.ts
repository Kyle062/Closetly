import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import {
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  optionsOutline,
  searchOutline,
  addOutline,
} from 'ionicons/icons';

interface StyleResult {
  image: string;
  title: string;
  tags: string;
  suggestion: string;
}

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
    BottomNavComponent,
  ],
})
export class ExplorePage implements OnInit {
  searchQuery: string = '';

  styleResults: StyleResult[] = [
    {
      image: '../../../assets/explore/minimalist.png',
      title: 'Minimalist Style',
      tags: 'Bold, Colorful, Elegant',
      suggestion: 'Bright blazer + neutral pants + statement shoes',
    },
    {
      image: '../../../assets/explore/eclectic.png',
      title: 'Eclectic Style',
      tags: 'Vintage, Eclectic, Bold',
      suggestion: 'Patterned shirt + high-waisted trousers + loafers',
    },
    {
      image: '../../../assets/explore/romantic.png',
      title: 'Romantic Style',
      tags: 'Soft, Feminine, Elegant',
      suggestion: 'Floral dress + delicate jewelry + strappy heels',
    },
    {
      image: '../../../assets/explore/retro.png',
      title: 'Retro Style',
      tags: 'Bold, Colorful, Elegant',
      suggestion: 'Bright blazer + neutral pants + statement shoes',
    },
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
  ) {
    addIcons({
      arrowBackOutline,
      optionsOutline,
      searchOutline,
      addOutline,
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/home']);
  }

  navigateToAddItem() {
    this.router.navigate(['/add-item']);
  }

  searchStyle(style: string) {
    this.searchQuery = style;
    console.log('Searching for:', style);
  }

  openFilter() {
    console.log('Opening filter options');
  }

  viewStyle(style: StyleResult) {
    console.log('Viewing style:', style.title);
  }
}
