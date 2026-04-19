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
  
  optionsOutline,
  searchOutline,
  heart,
  heartOutline,
} from 'ionicons/icons';

interface WardrobeItem {
  id: number;
  image: string;
  name: string;
  category: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.page.html',
  styleUrls: ['./wardrobe.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule, FormsModule,BottomNavComponent],
})
export class WardrobePage implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = 'All';
  categories: string[] = [
    'All',
    'Tops',
    'Bottoms',
    'Layers',
    'Shoes',
    'Accessories',
  ];

  wardrobeItems: WardrobeItem[] = [
    // Sunny Weather Items
    {
      id: 1,
      image: '../../../assets/homepage/sunny/cloth1.png',
      name: 'Summer Top',
      category: 'Tops',
      isFavorite: false,
    },
    {
      id: 2,
      image: '../../../assets/homepage/sunny/cloth2.png',
      name: 'Shorts',
      category: 'Bottoms',
      isFavorite: false,
    },
    {
      id: 3,
      image: '../../../assets/homepage/sunny/cloth4.png',
      name: 'Sunglasses',
      category: 'Accessories',
      isFavorite: false,
    },
    {
      id: 4,
      image: '../../../assets/homepage/sunny/shoes.png',
      name: 'Sandals',
      category: 'Shoes',
      isFavorite: false,
    },
    {
      id: 5,
      image: '../../../assets/homepage/sunny/accessory.png',
      name: 'Watch',
      category: 'Accessories',
      isFavorite: false,
    },

    // Hot Weather Items
    {
      id: 6,
      image: '../../../assets/homepage/hot/cloth1.png',
      name: 'Tank Top',
      category: 'Tops',
      isFavorite: true,
    },
    {
      id: 7,
      image: '../../../assets/homepage/hot/cloth2.png',
      name: 'Linen Pants',
      category: 'Bottoms',
      isFavorite: false,
    },
    {
      id: 8,
      image: '../../../assets/homepage/hot/cloth3.png',
      name: 'Sun Hat',
      category: 'Accessories',
      isFavorite: true,
    },
    {
      id: 9,
      image: '../../../assets/homepage/hot/shoes.png',
      name: 'Flip Flops',
      category: 'Shoes',
      isFavorite: false,
    },
    {
      id: 10,
      image: '../../../assets/homepage/hot/sunglasses.png',
      name: 'Sunglasses',
      category: 'Accessories',
      isFavorite: false,
    },

    // Rainy Weather Items
    {
      id: 11,
      image: '../../../assets/homepage/rainy/Closetlycloth7.png',
      name: 'Raincoat',
      category: 'Layers',
      isFavorite: true,
    },
    {
      id: 12,
      image: '../../../assets/homepage/rainy/Closetlycloth8.png',
      name: 'Waterproof Boots',
      category: 'Shoes',
      isFavorite: false,
    },
    {
      id: 13,
      image: '../../../assets/homepage/rainy/Umbrella.png',
      name: 'Umbrella',
      category: 'Accessories',
      isFavorite: true,
    },
    {
      id: 14,
      image: '../../../assets/homepage/rainy/Closetlycloth9.png',
      name: 'Rain Boots',
      category: 'Accessories',
      isFavorite: true,
    },
    {
      id: 15,
      image: '../../../assets/homepage/rainy/Waterproof bag.png',
      name: 'Waterproof Bag',
      category: 'Accessories',
      isFavorite: false,
    },

    // Cold Weather Items
    {
      id: 16,
      image: '../../../assets/homepage/cold/Closetlycloth10.png',
      name: 'Jacket',
      category: 'Layers',
      isFavorite: true,
    },
    {
      id: 17,
      image: '../../../assets/homepage/cold/Closetlycloth11.png',
      name: 'Long Pants',
      category: 'Bottoms',
      isFavorite: false,
    },
    {
      id: 18,
      image: '../../../assets/homepage/cold/Closetlycloth12.png',
      name: 'Closed Shoes',
      category: 'Shoes',
      isFavorite: true,
    },
    {
      id: 19,
      image: '../../../assets/homepage/cold/scarf.png',
      name: 'Scarf',
      category: 'Accessories',
      isFavorite: false,
    },
    {
      id: 20,
      image: '../../../assets/homepage/cold/gloves.png',
      name: 'Gloves',
      category: 'Accessories',
      isFavorite: false,
    },
    {id: 21,
      image: '../../../assets/random-outfit/layer/layer1.png',
      name: 'Denim Jacket',
      category: 'Layers',
      isFavorite: true,
    },
    {
      id: 22,
      image: '../../../assets/random-outfit/layer/layer2.png',
      name: 'Cardigan',
      category: 'Layers',
      isFavorite: false,
    },
    {
      id: 23,
      image: '../../../assets/random-outfit/layer/layer3.png',
      name: 'Blazer',
      category: 'Layers',
      isFavorite: false,
    },
      {
      id: 24,
      image: '../../../assets/random-outfit/layer/layer4.png',
      name: 'Bomber Jacket',
      category: 'Layers',
      isFavorite: false,
    },
  ];

  get filteredItems(): WardrobeItem[] {
    let filtered = this.wardrobeItems;

    // Filter by category
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(
        (item) => item.category === this.selectedCategory,
      );
    }

    // Filter by search query
    if (this.searchQuery && this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query),
      );
    }

    return filtered;
  }

  get favoriteItems(): WardrobeItem[] {
    return this.wardrobeItems.filter((item) => item.isFavorite);
  }

  get favoriteCount(): number {
    return this.favoriteItems.length;
  }

  constructor(
    private router: Router,
    private alertController: AlertController,
  ) {
    addIcons({
      arrowBackOutline,
      optionsOutline,
      searchOutline,
      heart,
      heartOutline,
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/home']);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  openFilter() {
    console.log('Opening filter options');
    // You can add filter modal here
  }

  toggleFavorite(item: WardrobeItem, event: Event) {
    event.stopPropagation();
    item.isFavorite = !item.isFavorite;

    const action = item.isFavorite ? 'added to' : 'removed from';
    console.log(`${item.name} ${action} favorites`);
  }

  async viewItem(item: WardrobeItem) {
    const alert = await this.alertController.create({
      header: item.name,
      message: `Category: ${item.category}\n${item.isFavorite ? '❤️ Favorite' : '🤍 Not favorite'}`,
      mode: 'ios',
      cssClass: 'modern-pill-alert',
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        },
        {
          text: item.isFavorite ? 'Remove Favorite' : 'Add to Favorites',
          handler: () => {
            item.isFavorite = !item.isFavorite;
          },
        },
      ],
    });

    await alert.present();
  }

  // Get item count by category
  getItemCountByCategory(category: string): number {
    if (category === 'All') {
      return this.wardrobeItems.length;
    }
    return this.wardrobeItems.filter((item) => item.category === category)
      .length;
  }
}
