import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
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
  imports: [IonContent, IonIcon, CommonModule, FormsModule],
})
export class PackingListPage implements OnInit {
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

  constructor() {
    // Register standalone Ionic icons used in the design
    addIcons({
      arrowBackOutline,
      addCircleOutline,
      locationOutline,
      trashOutline,
      calendarOutline,
      add,
      checkbox,
      squareOutline,
    });
  }

  ngOnInit() {}

  // Automatically calculate how many items are checked
  getPackedCount(list: PackingList): number {
    return list.items.filter((item) => item.checked).length;
  }

  // Calculate the percentage for the progress bar
  getProgressPercent(list: PackingList): number {
    const total = list.items.length;
    if (total === 0) return 0;
    return (this.getPackedCount(list) / total) * 100;
  }

  // Toggle item status when clicked
  toggleItem(item: PackingItem) {
    item.checked = !item.checked;
  }
}
