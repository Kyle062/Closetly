import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonIcon,
  IonButton,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  optionsOutline,
  cameraOutline,
  cloudUploadOutline,
  chevronDownOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, CommonModule, FormsModule],
})
export class AddItemPage implements OnInit {
  // Form data
  formData = {
    category: 'tops',
    color: 'black',
    season: 'all',
    image: null as string | null,
  };

  // Available options
  categories = [
    'Tops',
    'Bottoms',
    'Dresses',
    'Outerwear',
    'Shoes',
    'Accessories',
  ];
  colors = [
    'Black',
    'White',
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Brown',
    'Gray',
    'Pink',
    'Purple',
  ];
  seasons = ['All Season', 'Summer', 'Winter', 'Spring', 'Fall'];

  constructor(
    private router: Router,
    private alertController: AlertController,
  ) {
    addIcons({
      arrowBackOutline,
      optionsOutline,
      cameraOutline,
      cloudUploadOutline,
      chevronDownOutline,
      checkmarkCircleOutline,
    });
  }

  ngOnInit() {}

  // Navigate back to home page
  goBack() {
    this.router.navigate(['/home']);
  }

  // Take photo using device camera
  takePhoto() {
    console.log('Taking photo...');
    // Implement camera functionality
    // You can use Capacitor Camera plugin here
  }

  // Upload image from gallery
  uploadFromGallery() {
    console.log('Uploading from gallery...');
    // Implement gallery picker functionality
    // You can use Capacitor Filesystem or Camera plugin here
  }

  // Add item to wardrobe
  async addToWardrobe() {
    const alert = await this.alertController.create({
      header: 'Item Added!',
      message: 'Your item has been successfully added to your wardrobe.',
      mode: 'ios',
      cssClass: 'modern-pill-alert',
      buttons: [
        {
          text: 'Great',
          cssClass: 'alert-button-confirm',
          handler: () => {
            console.log('Item added:', this.formData);
            // Add your save logic here
            // Optionally navigate back to home
            // this.router.navigate(['/home']);
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
            height: 60px;
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
