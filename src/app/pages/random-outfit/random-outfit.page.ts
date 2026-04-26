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
  // Current random outfit (5 items)
  currentOutfit: OutfitItem[] = [];

  // Pool of available clothing items
  private clothingItems: { [key: string]: OutfitItem[] } = {
    tops: [
      {
        image: '../../../assets/homepage/sunny/cloth1.png',
        title: 'Summer Top',
        category: 'Top',
      },
      {
        image: '../../../assets/homepage/hot/cloth1.png',
        title: 'Tank Top',
        category: 'Top',
      },
      {
        image: '../../../assets/homepage/Comfortable/Closetlycloth13.png',
        title: 'Casual Top',
        category: 'Top',
      },
      {
        image: '../../../assets/homepage/cold/Closetlycloth10.png',
        title: 'Jacket',
        category: 'Top',
      },
    ],
    bottoms: [
      {
        image: '../../../assets/homepage/sunny/cloth2.png',
        title: 'Shorts',
        category: 'Bottom',
      },
      {
        image: '../../../assets/homepage/hot/cloth2.png',
        title: 'Linen Pants',
        category: 'Bottom',
      },
      {
        image: '../../../assets/homepage/Comfortable/Closetlycloth14.png',
        title: 'Jeans',
        category: 'Bottom',
      },
      {
        image: '../../../assets/homepage/cold/Closetlycloth11.png',
        title: 'Long Pants',
        category: 'Bottom',
      },
    ],
    accessories: [
      {
        image: '../../../assets/homepage/sunny/cloth4.png',
        title: 'Sunglasses',
        category: 'Accessory',
      },
      {
        image: '../../../assets/homepage/hot/cloth3.png',
        title: 'Hat',
        category: 'Accessory',
      },
      {
        image: '../../../assets/homepage/sunny/accessory.png',
        title: 'Watch',
        category: 'Accessory',
      },
      {
        image: '../../../assets/homepage/cold/scarf.png',
        title: 'Scarf',
        category: 'Accessory',
      },
    ],
    shoes: [
      {
        image: '../../../assets/homepage/sunny/shoes.png',
        title: 'Sandals',
        category: 'Shoes',
      },
      {
        image: '../../../assets/homepage/hot/shoes.png',
        title: 'Flip Flops',
        category: 'Shoes',
      },
      {
        image: '../../../assets/homepage/Comfortable/Closetlycloth15.png',
        title: 'Sneakers',
        category: 'Shoes',
      },
      {
        image: '../../../assets/homepage/cold/Closetlycloth12.png',
        title: 'Closed Shoes',
        category: 'Shoes',
      },
    ],
    extras: [
      {
        image: '../../../assets/homepage/sunny/accessory.png',
        title: 'Watch',
        category: 'Extra',
      },
      {
        image: '../../../assets/homepage/rainy/Waterproof bag.png',
        title: 'Bag',
        category: 'Extra',
      },
      {
        image: '../../../assets/homepage/cold/gloves.png',
        title: 'Gloves',
        category: 'Extra',
      },
      {
        image: '../../../assets/homepage/rainy/Umbrella.png',
        title: 'Umbrella',
        category: 'Extra',
      },
    ],
  };

  // Default outfit (5 items)
  private defaultOutfit: OutfitItem[] = [
    {
      image: '../../../assets/homepage/Comfortable/Closetlycloth13.png',
      title: 'Casual Top',
      category: 'Top',
    },
    {
      image: '../../../assets/homepage/Comfortable/Closetlycloth14.png',
      title: 'Jeans',
      category: 'Bottom',
    },
    {
      image: '../../../assets/homepage/Comfortable/Closetlycloth15.png',
      title: 'Sneakers',
      category: 'Shoes',
    },
    {
      image: '../../../assets/homepage/Comfortable/accessory1.png',
      title: 'Watch',
      category: 'Accessory',
    },
    {
      image: '../../../assets/homepage/Comfortable/accessory2.png',
      title: 'Bag',
      category: 'Extra',
    },
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
  ) {
    addIcons({
      arrowBackOutline,
      optionsOutline,
      appsOutline,
      checkmarkCircleOutline,
    });
  }

  ngOnInit() {
    this.generateRandomOutfit();
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  generateRandomOutfit() {
    const randomTop = this.getRandomItem(this.clothingItems['tops']);
    const randomBottom = this.getRandomItem(this.clothingItems['bottoms']);
    const randomAccessory = this.getRandomItem(
      this.clothingItems['accessories'],
    );
    const randomShoes = this.getRandomItem(this.clothingItems['shoes']);
    const randomExtra = this.getRandomItem(this.clothingItems['extras']);

    this.currentOutfit = [
      randomTop,
      randomBottom,
      randomAccessory,
      randomShoes,
      randomExtra,
    ];
  }

  private getRandomItem(items: OutfitItem[]): OutfitItem {
    const randomIndex = Math.floor(Math.random() * items.length);
    return { ...items[randomIndex] };
  }

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

    setTimeout(() => {
      const alertElement = document.querySelector('.modern-pill-alert');
      if (alertElement) {
        const wrapper = alertElement.querySelector('.alert-wrapper');
        if (wrapper) {
          const iconContainer = document.createElement('div');
          iconContainer.style.cssText = `
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 40px;
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
