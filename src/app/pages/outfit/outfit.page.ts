import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, IonIcon, AlertController 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  addCircleOutline, arrowBackOutline, eyeOutline, trashOutline, 
  optionsOutline, heartOutline,
} from 'ionicons/icons';

interface WishlistItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  priority: string;
  image: string;
}

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.page.html',
  styleUrls: ['./outfit.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonIcon, 
    CommonModule, FormsModule
  ]
})
export class OutfitPage implements OnInit {

  selectedPriority: string = '';
  
  wishlistItems: WishlistItem[] = [
    {
      id: 1,
      name: 'Vintage Denim Jacket',
      brand: "Levi's",
      price: 87.47,
      priority: 'high',
      image: '../../../assets/wishlist/denim-jacket.png'
    },
    {
      id: 2,
      name: 'White Sneakers',
      brand: 'Common Projects',
      price: 425.00,
      priority: 'medium',
      image: '../../../assets/wishlist/white-sneakers.png'
    },
    {
      id: 3,
      name: 'Minimalist Watch',
      brand: 'Daniel Wellington',
      price: 199.00,
      priority: 'medium',
      image: '../../../assets/wishlist/watch.png'
    },
    {
      id: 4,
      name: 'Silk Blouse',
      brand: 'Everlane',
      price: 68.00,
      priority: 'low',
      image: '../../../assets/wishlist/silk-blouse.png'
    }
  ];

  get filteredItems(): WishlistItem[] {
    if (!this.selectedPriority) {
      return this.wishlistItems;
    }
    return this.wishlistItems.filter(item => item.priority === this.selectedPriority);
  }

  get totalValue(): number {
    return this.wishlistItems.reduce((sum, item) => sum + item.price, 0);
  }

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      addCircleOutline, arrowBackOutline, eyeOutline, trashOutline,
      optionsOutline, heartOutline,
    });
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  filterByPriority(priority: string) {
    if (this.selectedPriority === priority) {
      this.selectedPriority = '';
    } else {
      this.selectedPriority = priority;
    }
  }

  addNewItem() {
    console.log('Add new item to wishlist');
    // Navigate to add item page or open modal
  }

  async viewItem(item: WishlistItem) {
    const alert = await this.alertController.create({
      header: item.name,
      message: `Brand: ${item.brand}\nPrice: $${item.price}\nPriority: ${item.priority}`,
      mode: 'ios',
      cssClass: 'modern-pill-alert',
      buttons: ['Close']
    });

    await alert.present();
  }

  async deleteItem(item: WishlistItem) {
    const alert = await this.alertController.create({
      header: 'Remove Item?',
      message: `Are you sure you want to remove ${item.name} from your wishlist?`,
      mode: 'ios',
      cssClass: 'modern-pill-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          cssClass: 'danger-button',
          handler: () => {
            this.wishlistItems = this.wishlistItems.filter(i => i.id !== item.id);
            console.log('Deleted:', item.name);
          }
        }
      ]
    });

    await alert.present();
  }
}