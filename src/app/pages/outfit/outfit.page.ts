import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
  IonBackButton, IonButton, IonIcon, IonFooter 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  addCircleOutline, arrowBackOutline, eyeOutline, trashOutline, 
  homeOutline, searchOutline, gridOutline, shirtOutline, personOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.page.html',
  styleUrls: ['./outfit.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, 
    IonBackButton, IonButton, IonIcon, IonFooter, 
    CommonModule, FormsModule
  ]
})
export class OutfitPage implements OnInit {

  // Mock data to match your screenshot
  wishlistItems = [
    {
      name: 'Vintage Denim Jacket',
      brand: "Levi's",
      price: '$87.47',
      priority: 'high',
      image: 'placeholder.jpg' 
    },
    {
      name: 'White Sneakers',
      brand: 'Common Projects',
      price: '$425.00',
      priority: 'medium',
      image: 'placeholder.jpg'
    },
    {
      name: 'Minimalist Watch',
      brand: 'Daniel Wellington',
      price: '$199.00',
      priority: 'medium',
      image: 'placeholder.jpg'
    },
    {
      name: 'Silk Blouse',
      brand: 'Everlane',
      price: '$68.00',
      priority: 'low',
      image: 'placeholder.jpg'
    }
  ];

  constructor() {
    // Registering icons for Ionic 17+ Standalone components
    addIcons({
      addCircleOutline, arrowBackOutline, eyeOutline, trashOutline,
      homeOutline, searchOutline, gridOutline, shirtOutline, personOutline
    });
  }

  ngOnInit() {
  }
}