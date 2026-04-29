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
  shirtOutline,
  optionsOutline,
  closeOutline,
  checkmarkOutline,
} from 'ionicons/icons';

interface Outfit {
  title: string;
  itemCount: number;
  tags: string;
  suggestion: string;
  image: string;
  isActive: boolean;
  items: WardrobeItem[];
}

interface WardrobeItem {
  id: number;
  image: string;
  name: string;
  category: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.page.html',
  styleUrls: ['./outfit.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, BottomNavComponent, CommonModule, FormsModule],
})
export class OutfitPage implements OnInit {
  showCreateModal = false;
  showDetailModal = false;
  selectedOutfit: Outfit | null = null;

  modalCategories: string[] = [
    'Tops',
    'Bottoms',
    'Layers',
    'Shoes/Sandals',
    'Accessories',
  ];
  modalSelectedCategory: string = 'Tops';

  newOutfit: {
    title: string;
    tags: string;
    selectedItems: WardrobeItem[];
  } = {
    title: '',
    tags: '',
    selectedItems: [],
  };

  outfits: Outfit[] = [
    {
      title: 'The Weston Comfort',
      itemCount: 3,
      tags: 'Effortless, Breezy, Tropical',
      suggestion: 'Summer Top + Shorts + Sandals',
      image: '../../../assets/homepage/sunny/cloth1.png',
      isActive: false,
      items: [
        { id: 1, image: '../../../assets/homepage/sunny/cloth1.png', name: 'Summer Top', category: 'Tops', isFavorite: false },
        { id: 2, image: '../../../assets/homepage/sunny/cloth2.png', name: 'Shorts', category: 'Bottoms', isFavorite: false },
        { id: 4, image: '../../../assets/homepage/sunny/shoes.png', name: 'Sandals', category: 'Shoes/Sandals', isFavorite: false },
      ]
    },
    {
      title: 'Cold Weather Ready',
      itemCount: 4,
      tags: 'Sharp, Confident, Practical',
      suggestion: 'Jacket + Long Pants + Closed Shoes + Scarf',
      image: '../../../assets/homepage/cold/Closetlycloth10.png',
      isActive: false,
      items: [
        { id: 16, image: '../../../assets/homepage/cold/Closetlycloth10.png', name: 'Jacket', category: 'Layers', isFavorite: true },
        { id: 17, image: '../../../assets/homepage/cold/Closetlycloth11.png', name: 'Long Pants', category: 'Bottoms', isFavorite: false },
        { id: 18, image: '../../../assets/homepage/cold/Closetlycloth12.png', name: 'Closed Shoes', category: 'Shoes/Sandals', isFavorite: true },
        { id: 19, image: '../../../assets/homepage/cold/scarf.png', name: 'Scarf', category: 'Accessories', isFavorite: false },
      ]
    },
    {
      title: 'Hot Summer Day',
      itemCount: 3,
      tags: 'Light, Airy, Minimal',
      suggestion: 'Tank Top + Linen Pants + Flip Flops',
      image: '../../../assets/homepage/hot/cloth1.png',
      isActive: false,
      items: [
        { id: 6, image: '../../../assets/homepage/hot/cloth1.png', name: 'Tank Top', category: 'Tops', isFavorite: true },
        { id: 7, image: '../../../assets/homepage/hot/cloth2.png', name: 'Linen Pants', category: 'Bottoms', isFavorite: false },
        { id: 9, image: '../../../assets/homepage/hot/shoes.png', name: 'Flip Flops', category: 'Shoes/Sandals', isFavorite: false },
      ]
    },
    {
      title: 'Weekend Vibes',
      itemCount: 5,
      tags: 'Relaxed, Cozy, Unplugged',
      suggestion: 'Summer Top + Shorts + Sunglasses + Sandals + Watch',
      image: '../../../assets/homepage/sunny/accessory.png',
      isActive: false,
      items: [
        { id: 1, image: '../../../assets/homepage/sunny/cloth1.png', name: 'Summer Top', category: 'Tops', isFavorite: false },
        { id: 2, image: '../../../assets/homepage/sunny/cloth2.png', name: 'Shorts', category: 'Bottoms', isFavorite: false },
        { id: 3, image: '../../../assets/homepage/sunny/cloth4.png', name: 'Sunglasses', category: 'Accessories', isFavorite: false },
        { id: 4, image: '../../../assets/homepage/sunny/shoes.png', name: 'Sandals', category: 'Shoes/Sandals', isFavorite: false },
        { id: 5, image: '../../../assets/homepage/sunny/accessory.png', name: 'Watch', category: 'Accessories', isFavorite: false },
      ]
    }
  ];

  wardrobeItems: WardrobeItem[] = [
    { id: 1, image: '../../../assets/homepage/sunny/cloth1.png', name: 'Summer Top', category: 'Tops', isFavorite: false },
    { id: 2, image: '../../../assets/homepage/sunny/cloth2.png', name: 'Shorts', category: 'Bottoms', isFavorite: false },
    { id: 3, image: '../../../assets/homepage/sunny/cloth4.png', name: 'Sunglasses', category: 'Accessories', isFavorite: false },
    { id: 4, image: '../../../assets/homepage/sunny/shoes.png', name: 'Sandals', category: 'Shoes/Sandals', isFavorite: false },
    { id: 5, image: '../../../assets/homepage/sunny/accessory.png', name: 'Watch', category: 'Accessories', isFavorite: false },
    { id: 6, image: '../../../assets/homepage/hot/cloth1.png', name: 'Tank Top', category: 'Tops', isFavorite: true },
    { id: 7, image: '../../../assets/homepage/hot/cloth2.png', name: 'Linen Pants', category: 'Bottoms', isFavorite: false },
    { id: 8, image: '../../../assets/homepage/hot/cloth3.png', name: 'Sun Hat', category: 'Accessories', isFavorite: true },
    { id: 9, image: '../../../assets/homepage/hot/shoes.png', name: 'Flip Flops', category: 'Shoes/Sandals', isFavorite: false },
    { id: 10, image: '../../../assets/homepage/hot/sunglasses.png', name: 'Sunglasses', category: 'Accessories', isFavorite: false },
    { id: 11, image: '../../../assets/homepage/rainy/Closetlycloth7.png', name: 'Raincoat', category: 'Layers', isFavorite: true },
    { id: 12, image: '../../../assets/homepage/rainy/Closetlycloth8.png', name: 'Waterproof Boots', category: 'Shoes/Sandals', isFavorite: false },
    { id: 13, image: '../../../assets/homepage/rainy/Umbrella.png', name: 'Umbrella', category: 'Accessories', isFavorite: true },
    { id: 14, image: '../../../assets/homepage/rainy/Closetlycloth9.png', name: 'Rain Boots', category: 'Accessories', isFavorite: true },
    { id: 15, image: '../../../assets/homepage/rainy/Waterproof bag.png', name: 'Waterproof Bag', category: 'Accessories', isFavorite: false },
    { id: 16, image: '../../../assets/homepage/cold/Closetlycloth10.png', name: 'Jacket', category: 'Layers', isFavorite: true },
    { id: 17, image: '../../../assets/homepage/cold/Closetlycloth11.png', name: 'Long Pants', category: 'Bottoms', isFavorite: false },
    { id: 18, image: '../../../assets/homepage/cold/Closetlycloth12.png', name: 'Closed Shoes', category: 'Shoes/Sandals', isFavorite: true },
    { id: 19, image: '../../../assets/homepage/cold/scarf.png', name: 'Scarf', category: 'Accessories', isFavorite: false },
    { id: 20, image: '../../../assets/homepage/cold/gloves.png', name: 'Gloves', category: 'Accessories', isFavorite: false },
    { id: 21, image: '../../../assets/random-outfit/layer/layer1.png', name: 'Denim Jacket', category: 'Layers', isFavorite: true },
    { id: 22, image: '../../../assets/random-outfit/layer/layer2.png', name: 'Cardigan', category: 'Layers', isFavorite: false },
    { id: 23, image: '../../../assets/random-outfit/layer/layer3.png', name: 'Blazer', category: 'Layers', isFavorite: false },
    { id: 24, image: '../../../assets/random-outfit/layer/layer4.png', name: 'Bomber Jacket', category: 'Layers', isFavorite: false },
  ];

  private clickTimer: any;
  private lastClickedIndex: number = -1;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      arrowBackOutline,
      shirtOutline,
      optionsOutline,
      closeOutline,
      checkmarkOutline,
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/home']);
  }

  onOutfitClick(outfit: Outfit, index: number) {
    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
    }

    if (this.lastClickedIndex === index) {
      this.openOutfitDetail(outfit);
      this.lastClickedIndex = -1;
      return;
    }

    this.outfits.forEach((o) => (o.isActive = false));
    outfit.isActive = true;
    this.lastClickedIndex = index;

    this.clickTimer = setTimeout(() => {
      this.lastClickedIndex = -1;
    }, 300);
  }

  openOutfitDetail(outfit: Outfit) {
    this.selectedOutfit = outfit;
    this.showDetailModal = true;
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedOutfit = null;
  }

  async deleteOutfit(outfit: Outfit) {
    const alert = await this.alertController.create({
      header: 'Delete Outfit?',
      message: `Are you sure you want to delete "${outfit.title}"?`,
      mode: 'ios',
      cssClass: 'modern-pill-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            this.outfits = this.outfits.filter((o) => o !== outfit);
            this.closeDetailModal();
          },
        },
      ],
    });
    await alert.present();
  }

  getItemsByCategory(items: WardrobeItem[]): { category: string; items: WardrobeItem[] }[] {
    const grouped: { [key: string]: WardrobeItem[] } = {};
    items.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return Object.keys(grouped).map((category) => ({
      category,
      items: grouped[category],
    }));
  }

  openCreateOutfitModal() {
    this.showCreateModal = true;
    this.newOutfit = { title: '', tags: '', selectedItems: [] };
    this.modalSelectedCategory = 'Tops';
  }

  closeModal() {
    this.showCreateModal = false;
  }

  selectModalCategory(category: string) {
    this.modalSelectedCategory = category;
  }

  getModalFilteredItems(): WardrobeItem[] {
    return this.wardrobeItems.filter(
      (item) => item.category === this.modalSelectedCategory
    );
  }

  isItemSelected(item: WardrobeItem): boolean {
    return this.newOutfit.selectedItems.some((i) => i.id === item.id);
  }

  toggleItemSelection(item: WardrobeItem) {
    const index = this.newOutfit.selectedItems.findIndex(
      (i) => i.id === item.id
    );
    if (index > -1) {
      this.newOutfit.selectedItems.splice(index, 1);
    } else {
      this.newOutfit.selectedItems.push({ ...item });
    }
  }

  removeSelectedItem(item: WardrobeItem) {
    this.newOutfit.selectedItems = this.newOutfit.selectedItems.filter(
      (i) => i.id !== item.id
    );
  }

  canCreateOutfit(): boolean {
    return (
      this.newOutfit.title.trim() !== '' &&
      this.newOutfit.selectedItems.length > 0
    );
  }

  async createOutfit() {
    if (!this.canCreateOutfit()) return;

    const suggestion = this.newOutfit.selectedItems
      .map((i) => i.name)
      .join(' + ');

    const newOutfit: Outfit = {
      title: this.newOutfit.title,
      itemCount: this.newOutfit.selectedItems.length,
      tags: this.newOutfit.tags || 'Custom Outfit',
      suggestion: suggestion,
      image: this.newOutfit.selectedItems[0]?.image || '../../../assets/homepage/sunny/cloth1.png',
      isActive: false,
      items: [...this.newOutfit.selectedItems],
    };

    this.outfits.unshift(newOutfit);

    const alert = await this.alertController.create({
      header: 'Outfit Created!',
      message: `"${newOutfit.title}" has been added to your outfits.`,
      mode: 'ios',
      cssClass: 'modern-pill-alert',
      buttons: ['Great'],
    });

    await alert.present();
    this.closeModal();
  }
}