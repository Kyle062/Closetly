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
  partlySunnyOutline,
  rainyOutline,
  sunnyOutline,
  snowOutline,
  optionsOutline,
  scanOutline,
  cloudyOutline,
  thunderstormOutline,
  checkmarkCircleOutline,
  closeOutline,
} from 'ionicons/icons';

interface OutfitItem {
  image: string;
  title: string;
  description: string;
}

interface WeatherOutfitSuggestion {
  title: string;
  description: string;
  items: OutfitItem[];
}

@Component({
  selector: 'app-weather-outfit',
  templateUrl: './weather-outfit.page.html',
  styleUrls: ['./weather-outfit.page.scss'],
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
export class WeatherOutfitPage implements OnInit {
  // Current actual weather properties (never changes with category clicks)
  currentWeather: any = {
    temperature: '--',
    condition: 'Loading...',
    icon: 'cloudy-outline',
    city: 'Davao de Oro',
    feelsLike: '--',
    category: 'Sunny',
  };

  isLoading: boolean = true;
  weatherError: string = '';

  // Selected category for outfit browsing (can be different from actual weather)
  selectedCategory: string = 'Sunny';
  forecastBackground: string =
    '../../../assets/homepage/forcast/SunnyForcast.png';
  forecastIcon: string = 'partly-sunny-outline';

  // Current outfit suggestion
  currentOutfit: OutfitItem[] = [];

  // Working API key for OpenWeatherMap
  private apiKey = '35efb00415742337258dd1ba28238572';

  // Using Compostela Valley coordinates
  private lat = 7.68333;
  private lon = 126.11667;

  private apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`;

  // Outfit suggestions for different weather conditions (5 items each)
  private outfitSuggestions: { [key: string]: WeatherOutfitSuggestion } = {
    Sunny: {
      title: 'Suggested Outfit',
      description: 'Perfect for sunny weather',
      items: [
        {
          image: '../../../assets/homepage/sunny/cloth1.png',
          title: 'Summer Top',
          description: 'Light and breathable',
        },
        {
          image: '../../../assets/homepage/sunny/cloth2.png',
          title: 'Shorts',
          description: 'Comfortable and cool',
        },
        {
          image: '../../../assets/homepage/sunny/cloth4.png',
          title: 'Sunglasses',
          description: 'UV protection',
        },
        {
          image: '../../../assets/homepage/sunny/shoes.png',
          title: 'Sandals',
          description: 'Perfect for warm weather',
        },
        {
          image: '../../../assets/homepage/sunny/accessory.png',
          title: 'Watch',
          description: 'Stylish accessory',
        },
      ],
    },
    Hot: {
      title: 'Suggested Outfit',
      description: 'Stay cool in hot weather',
      items: [
        {
          image: '../../../assets/homepage/hot/cloth1.png',
          title: 'Tank Top',
          description: 'Maximum breathability',
        },
        {
          image: '../../../assets/homepage/hot/cloth2.png',
          title: 'Brown Shorts',
          description: 'Lightweight and airy',
        },
        {
          image: '../../../assets/homepage/hot/cloth3.png',
          title: 'Sun Hat',
          description: 'Sun protection',
        },
        {
          image: '../../../assets/homepage/hot/shoes.png',
          title: 'Flip Flops',
          description: 'Easy and comfortable',
        },
        {
          image: '../../../assets/homepage/hot/accessory.png',
          title: 'Sunglasses',
          description: 'Eye protection',
        },
      ],
    },
    Rainy: {
      title: 'Suggested Outfit',
      description: 'Stay dry in rainy weather',
      items: [
        {
          image: '../../../assets/homepage/rainy/Closetlycloth7.png',
          title: 'Raincoat',
          description: 'Waterproof protection',
        },
        {
          image: '../../../assets/homepage/rainy/Closetlycloth8.png',
          title: 'Waterproof Boots',
          description: 'Keep feet dry',
        },
        {
          image: '../../../assets/homepage/rainy/Umbrella.png',
          title: 'Umbrella',
          description: 'Essential rain gear',
        },
        {
          image: '../../../assets/homepage/rainy/Closetlycloth9.png',
          title: 'Rain Hat',
          description: 'Stylish and functional',
        },
        {
          image: '../../../assets/homepage/rainy/Waterproof bag.png',
          title: 'Waterproof Bag',
          description: 'Protect your belongings',
        },
      ],
    },
    Cold: {
      title: 'Suggested Outfit',
      description: 'Stay warm in cold weather',
      items: [
        {
          image: '../../../assets/homepage/cold/Closetlycloth10.png',
          title: 'Jacket',
          description: 'Warm outer layer',
        },
        {
          image: '../../../assets/homepage/cold/Closetlycloth11.png',
          title: 'Long Pants',
          description: 'Insulated bottoms',
        },
        {
          image: '../../../assets/homepage/cold/Closetlycloth12.png',
          title: 'Closed Shoes',
          description: 'Keep feet warm',
        },
        {
          image: '../../../assets/homepage/cold/scarf.png',
          title: 'Scarf',
          description: 'Neck warmth',
        },
        {
          image: '../../../assets/homepage/cold/gloves.png',
          title: 'Gloves',
          description: 'Hand protection',
        },
      ],
    },
  };

  // Background images and icons for different weather conditions
  private forecastBackgrounds: { [key: string]: string } = {
    Sunny: '../../../assets/homepage/forcast/SunnyForcast.png',
    Hot: '../../../assets/homepage/forcast/HotForcast.png',
    Rainy: '../../../assets/homepage/forcast/RainForcast.png',
    Cold: '../../../assets/homepage/forcast/coldForcast.png',
  };

  private forecastIcons: { [key: string]: string } = {
    Sunny: 'partly-sunny-outline',
    Hot: 'sunny-outline',
    Rainy: 'rainy-outline',
    Cold: 'cloudy-outline',
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
  ) {
    addIcons({
      arrowBackOutline,
      partlySunnyOutline,
      rainyOutline,
      sunnyOutline,
      snowOutline,
      optionsOutline,
      scanOutline,
      cloudyOutline,
      thunderstormOutline,
      checkmarkCircleOutline,
      closeOutline,
    });
  }

  ngOnInit() {
    this.getWeatherData();
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  getWeatherData() {
    this.isLoading = true;
    this.weatherError = '';

    fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Weather data unavailable (HTTP ${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Weather API Response:', data);
        this.updateWeatherUI(data);
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Weather API Error:', error);
        this.weatherError = 'Unable to load weather data';
        this.isLoading = false;
        this.setMockWeatherData();
      });
  }

  determineWeatherCategory(temperature: number, condition: string): string {
    const rainConditions = ['Rain', 'Drizzle', 'Thunderstorm', 'Mist', 'Fog'];
    if (rainConditions.some((cond) => condition.includes(cond))) {
      return 'Rainy';
    }

    if (temperature >= 30) {
      return 'Hot';
    } else if (temperature >= 25 && temperature < 30) {
      return 'Sunny';
    } else if (temperature < 22) {
      return 'Cold';
    } else {
      return 'Sunny';
    }
  }

  updateWeatherUI(data: any) {
    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const condition = data.weather[0].main;

    let cityName = data.name;
    if (cityName === '' || !cityName) {
      cityName = 'Davao de Oro';
    }

    const weatherCategory = this.determineWeatherCategory(
      temperature,
      condition,
    );

    this.currentWeather = {
      temperature: `${temperature}°C`,
      condition: weatherCategory,
      feelsLike: `Feels like ${feelsLike}°C`,
      city: cityName,
      category: weatherCategory,
    };

    this.selectedCategory = weatherCategory;
    this.updateForecastBanner(weatherCategory);
    this.loadOutfitForCategory(weatherCategory);
  }

  updateForecastBanner(category: string) {
    this.forecastBackground =
      this.forecastBackgrounds[category] || this.forecastBackgrounds['Sunny'];
    this.forecastIcon = this.forecastIcons[category] || 'partly-sunny-outline';
  }

  loadOutfitForCategory(category: string) {
    let suggestion = this.outfitSuggestions[category];

    if (!suggestion) {
      suggestion = this.outfitSuggestions['Sunny'];
    }

    this.currentOutfit = suggestion.items;
  }

  onCategoryClick(category: string) {
    this.selectedCategory = category;
    this.loadOutfitForCategory(category);
  }

  async saveOutfit() {
    const alert = await this.alertController.create({
      header: 'Outfit Saved!',
      message: 'This outfit has been added to your collection.',
      mode: 'ios',
      cssClass: 'modern-pill-alert',
      buttons: [
        {
          text: 'Got it',
          cssClass: 'alert-button-confirm',
          handler: () => {
            console.log('Outfit saved:', this.currentOutfit);
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

  setMockWeatherData() {
    this.currentWeather = {
      temperature: '28°C',
      condition: 'Sunny',
      feelsLike: 'Feels like 30°C',
      city: 'Davao de Oro',
      category: 'Sunny',
    };

    this.selectedCategory = 'Sunny';
    this.forecastBackground = this.forecastBackgrounds['Sunny'];
    this.forecastIcon = 'partly-sunny-outline';
    this.loadOutfitForCategory('Sunny');
  }

  refreshWeather() {
    this.getWeatherData();
  }
}
