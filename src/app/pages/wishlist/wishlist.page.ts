import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import {
  IonContent,
  IonIcon,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  addCircleOutline,
  eyeOutline,
  trashOutline,
  optionsOutline,
  closeOutline,
  heartOutline,
} from 'ionicons/icons';

interface WishlistItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  priority: 'high' | 'medium' | 'low';
  image: string;
}

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, BottomNavComponent, CommonModule, FormsModule],
})
export class WishlistPage implements OnInit {
  showAddModal = false;
  showViewModal = false;
  selectedItem: WishlistItem | null = null;
  selectedPriority: string = '';

  newItem = {
    name: '',
    brand: '',
    price: 0,
    priority: 'medium' as 'high' | 'medium' | 'low',
  };

  wishlistItems: WishlistItem[] = [
    {
      id: 1,
      name: 'Vintage Denim Jacket',
      brand: "Levi's",
      price: 87.47,
      priority: 'high',
      image: '../../../assets/wishlist/denimjacket.png',
    },
    {
      id: 2,
      name: 'White Sneakers',
      brand: 'Common Projects',
      price: 425.0,
      priority: 'medium',
      image: '../../../assets/wishlist/whitesneeker.png',
    },
    {
      id: 3,
      name: 'Minimalist Watch',
      brand: 'Daniel Wellington',
      price: 199.0,
      priority: 'medium',
      image: '../../../assets/wishlist/watch.png',
    },
    {
      id: 4,
      name: 'Polo Shirt',
      brand: 'Everlane',
      price: 68.0,
      priority: 'low',
      image: '../../../assets/wishlist/polo.png',
    },
  ];

  get filteredItems(): WishlistItem[] {
    if (!this.selectedPriority) return this.wishlistItems;
    return this.wishlistItems.filter(
      (item) => item.priority === this.selectedPriority
    );
  }

  get totalValue(): number {
    return this.wishlistItems.reduce((acc, item) => acc + item.price, 0);
  }

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      arrowBackOutline,
      addCircleOutline,
      eyeOutline,
      trashOutline,
      optionsOutline,
      closeOutline,
      heartOutline,
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/profile']);
  }

  // Priority filter - double click resets
  filterByPriority(priority: string) {
    if (this.selectedPriority === priority) {
      this.selectedPriority = '';
    } else {
      this.selectedPriority = priority;
    }
  }

  // Add Item Modal
  openAddModal() {
    this.showAddModal = true;
    this.newItem = { name: '', brand: '', price: 0, priority: 'medium' };
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addItem() {
    if (!this.newItem.name.trim() || !this.newItem.price) return;

    const newWishlistItem: WishlistItem = {
      id: Date.now(),
      name: this.newItem.name.trim(),
      brand: this.newItem.brand.trim() || 'Unknown Brand',
      price: this.newItem.price,
      priority: this.newItem.priority,
      image: '../../../assets/wishlist/placeholder.png',
    };

    this.wishlistItems.unshift(newWishlistItem);
    this.closeAddModal();
  }

  // View Item Modal
  viewItem(item: WishlistItem) {
    this.selectedItem = item;
    this.showViewModal = true;
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedItem = null;
  }

  // Delete Item
  async deleteItem(item: WishlistItem) {
    const alert = await this.alertController.create({
      header: 'Remove Item?',
      message: `Are you sure you want to remove "${item.name}" from your wishlist?`,
      mode: 'ios',
      cssClass: 'modern-pill-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            this.wishlistItems = this.wishlistItems.filter(
              (i) => i.id !== item.id
            );
          },
        },
      ],
    });
    await alert.present();
  }
}
