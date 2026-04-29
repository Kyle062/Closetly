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
  locationOutline,
  trashOutline,
  calendarOutline,
  add,
  checkbox,
  squareOutline,
  optionsOutline,
  closeOutline,
  briefcaseOutline,
} from 'ionicons/icons';

interface PackingItem {
  name: string;
  checked: boolean;
}

interface PackingList {
  id: number;
  destination: string;
  dates: string;
  items: PackingItem[];
}

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.page.html',
  styleUrls: ['./packing-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, BottomNavComponent, CommonModule, FormsModule],
})
export class PackingListPage implements OnInit {
  showNewTripModal = false;
  showAddItemModal = false;
  selectedList: PackingList | null = null;
  newItemName = '';

  newTrip = {
    destination: '',
    dates: '',
  };

  packingLists: PackingList[] = [
    {
      id: 1,
      destination: 'Paris, France',
      dates: 'May 10-17, 2026',
      items: [
        { name: 'White Shirt', checked: true },
        { name: 'Black Jeans', checked: true },
        { name: 'Sneakers', checked: false },
        { name: 'Denim Jacket', checked: false },
        { name: 'Sunglasses', checked: false },
      ],
    },
    {
      id: 2,
      destination: 'Beach Vacation',
      dates: 'June 5-12, 2026',
      items: [
        { name: 'Sneakers', checked: false },
        { name: 'Denim Jacket', checked: false },
        { name: 'Sunglasses', checked: false },
      ],
    },
  ];

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      arrowBackOutline,
      addCircleOutline,
      locationOutline,
      trashOutline,
      calendarOutline,
      add,
      checkbox,
      squareOutline,
      optionsOutline,
      closeOutline,
      briefcaseOutline,
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/profile']);
  }

  getPackedCount(list: PackingList): number {
    return list.items.filter((item) => item.checked).length;
  }

  getProgressPercent(list: PackingList): number {
    const total = list.items.length;
    if (total === 0) return 0;
    return (this.getPackedCount(list) / total) * 100;
  }

  toggleItem(item: PackingItem) {
    item.checked = !item.checked;
  }

  // New Trip Modal
  openNewTripModal() {
    this.showNewTripModal = true;
    this.newTrip = { destination: '', dates: '' };
  }

  closeNewTripModal() {
    this.showNewTripModal = false;
  }

  createTrip() {
    if (!this.newTrip.destination.trim()) return;

    const newList: PackingList = {
      id: Date.now(),
      destination: this.newTrip.destination.trim(),
      dates: this.newTrip.dates.trim() || 'Dates TBD',
      items: [],
    };

    this.packingLists.unshift(newList);
    this.closeNewTripModal();
  }

  // Delete Trip
  async deleteTrip(list: PackingList) {
    const alert = await this.alertController.create({
      header: 'Delete Trip?',
      message: `Are you sure you want to delete "${list.destination}"?`,
      mode: 'ios',
      cssClass: 'modern-pill-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            this.packingLists = this.packingLists.filter(
              (l) => l.id !== list.id
            );
          },
        },
      ],
    });
    await alert.present();
  }

  // Add Item Modal
  openAddItemModal(list: PackingList) {
    this.selectedList = list;
    this.newItemName = '';
    this.showAddItemModal = true;
  }

  closeAddItemModal() {
    this.showAddItemModal = false;
    this.selectedList = null;
    this.newItemName = '';
  }

  addItemToList() {
    if (!this.newItemName.trim() || !this.selectedList) return;

    this.selectedList.items.push({
      name: this.newItemName.trim(),
      checked: false,
    });

    this.closeAddItemModal();
  }
}
