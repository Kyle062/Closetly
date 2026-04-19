import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonIcon,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonButton,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  optionsOutline,
  appsOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';

interface OutfitItem {
  image: string;
  title: string;
  category: string;
}

@Component({
  selector: 'app-random-outfit',
  templateUrl: './random-outfit.page.html',
  styleUrls: ['./random-outfit.page.scss'],
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
export class RandomOutfitPage implements OnInit {
  // Current random outfit
  currentOutfit: OutfitItem[] = [];

  // Pool of available clothing items
  private clothingItems: { [key: string]: OutfitItem[] } = {
    tops: [
      {
        image: '../../../assets/random-outfit/top/top1.png',
        title: 'White T-Shirt',
        category: 'Top',
      },
      {
        image: '../../../assets/random-outfit/top/top2.png',
        title: 'Black Tank Top',
        category: 'Top',
      },
      {
        image: '../../../assets/random-outfit/top/top3.png',
        title: 'Striped Shirt',
        category: 'Top',
      },
      {
        image: '../../../assets/random-outfit/top/top4.png',
        title: 'Hoodie',
        category: 'Top',
      },
    ],
    bottoms: [
      {
        image: '../../../assets/random-outfit/bottom/bottom1.png',
        title: 'Black Jeans',
        category: 'Bottom',
      },
      {
        image: '../../../assets/random-outfit/bottom/bottom2.png',
        title: 'Khaki Pants',
        category: 'Bottom',
      },
      {
        image: '../../../assets/random-outfit/bottom/bottom3.png',
        title: 'Denim Shorts',
        category: 'Bottom',
      },
      {
        image: '../../../assets/random-outfit/bottom/bottom4.png',
        title: 'Joggers',
        category: 'Bottom',
      },
    ],
    layers: [
      {
        image: '../../../assets/homepage/random/layer1.png',
        title: 'Denim Jacket',
        category: 'Layer',
      },
      {
        image: '../../../assets/homepage/random/layer2.png',
        title: 'Cardigan',
        category: 'Layer',
      },
      {
        image: '../../../assets/homepage/random/layer3.png',
        title: 'Blazer',
        category: 'Layer',
      },
      {
        image: '../../../assets/homepage/random/layer4.png',
        title: 'Bomber Jacket',
        category: 'Layer',
      },
    ],
  };

  // Default placeholder outfit
  private defaultOutfit: OutfitItem[] = [
    {
      image: '../../../assets/homeplaceholders/cloth-placeholder.png',
      title: 'White T-Shirt',
      category: 'Top',
    },
    {
      image: '../../../assets/homeplaceholders/cloth-placeholder.png',
      title: 'Black Jeans',
      category: 'Bottom',
    },
    {
      image: '../../../assets/homeplaceholders/cloth-placeholder.png',
      title: 'Denim Jacket',
      category: 'Layer',
    },
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
  ) {
    // Register the icons used in the template
    addIcons({
      arrowBackOutline,
      optionsOutline,
      appsOutline,
      checkmarkCircleOutline,
    });
  }

  ngOnInit() {
    // Generate initial random outfit
    this.generateRandomOutfit();
  }

  // Navigate back to home page
  goBack() {
    this.router.navigate(['/home']);
  }

  // Generate random outfit
  generateRandomOutfit() {
    const randomTop = this.getRandomItem(this.clothingItems['tops']);
    const randomBottom = this.getRandomItem(this.clothingItems['bottoms']);
    const randomLayer = this.getRandomItem(this.clothingItems['layers']);

    this.currentOutfit = [randomTop, randomBottom, randomLayer];
  }

  // Get random item from array
  private getRandomItem(items: OutfitItem[]): OutfitItem {
    const randomIndex = Math.floor(Math.random() * items.length);
    return { ...items[randomIndex] }; // Return a copy to avoid reference issues
  }

  // Save outfit with modern pill-style alert
  async saveOutfit() {
    const alert = await this.alertController.create({
      header: 'Outfit Saved!',
      message: 'This random outfit has been added to your collection.',
      mode: 'ios',
      cssClass: 'modern-pill-alert',
      buttons: [
        {
          text: 'Got it',
          cssClass: 'alert-button-confirm',
          handler: () => {
            console.log('Random outfit saved:', this.currentOutfit);
          },
        },
      ],
    });

    await alert.present();

    // Add custom icon to the alert
    setTimeout(() => {
      const alertElement = document.querySelector('.modern-pill-alert');
      if (alertElement) {
        const wrapper = alertElement.querySelector('.alert-wrapper');
        if (wrapper) {
          const iconContainer = document.createElement('div');
          iconContainer.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 70px;
            background: linear-gradient(135deg, #4CAF50, #45a049);
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            z-index: 10;
          `;

          const icon = document.createElement('ion-icon');
          icon.setAttribute('name', 'checkmark-circle-outline');
          icon.style.cssText = `
            font-size: 36px;
            color: white;
          `;

          iconContainer.appendChild(icon);
          wrapper.appendChild(iconContainer);

          const header = wrapper.querySelector('.alert-head');
          if (header) {
            header.setAttribute('style', 'padding-top: 45px !important');
          }
        }
      }
    }, 50);
  }
}
