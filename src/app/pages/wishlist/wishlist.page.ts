import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, addCircleOutline, eyeOutline, trashOutline } from 'ionicons/icons';

interface WishlistItem {
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
  imports: [IonContent, IonIcon, CommonModule, FormsModule]
})
export class WishlistPage implements OnInit {
  
  wishlistItems: WishlistItem[] = [
    {
      name: 'Vintage Denim Jacket',
      brand: "Levi's",
      price: 87.47,
      priority: 'high',
      image: 'https://placehold.co/300x300/e0e0e0/555555?text=Jacket'
    },
    {
      name: 'White Sneakers',
      brand: 'Common Projects',
      price: 425.00,
      priority: 'medium',
      image: 'https://placehold.co/300x300/e0e0e0/555555?text=Sneakers'
    },
    {
      name: 'Minimalist Watch',
      brand: 'Daniel Wellington',
      price: 199.00,
      priority: 'medium',
      image: 'https://placehold.co/300x300/e0e0e0/555555?text=Watch'
    },
    {
      name: 'Polo Shirt',
      brand: 'Everlane',
      price: 68.00,
      priority: 'low',
      image: 'https://placehold.co/300x300/e0e0e0/555555?text=Polo'
    }
  ];

  constructor() {
    addIcons({ arrowBackOutline, addCircleOutline, eyeOutline, trashOutline });
  }

  ngOnInit() {}

  get totalValue(): number {
    return this.wishlistItems.reduce((acc, item) => acc + item.price, 0);
  }
}