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

  // Outfit suggestions for different weather conditions
  private outfitSuggestions: { [key: string]: WeatherOutfitSuggestion } = {
    Sunny: {
      title: 'Suggested Outfit',
      description: 'Perfect for sunny weather',
      items: [
        {
          image: '../../../assets/homepage/sunny/cloth1.png',
          title: 'White Shirt',
          description: 'Perfect for sunny weather',
        },
        {
          image: '../../../assets/homepage/sunny/cloth2.png',
          title: 'Tan Pants',
          description: 'Perfect for sunny weather',
        },
        {
          image: '../../../assets/homepage/sunny/cloth4.png',
          title: 'Sunglasses',
          description: 'Perfect for sunny weather',
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
          description: 'Perfect for hot weather',
        },
        {
          image: '../../../assets/homepage/hot/cloth2.png',
          title: 'Pants',
          description: 'Perfect for hot weather',
        },
        {
          image: '../../../assets/homepage/hot/cloth3.png',
          title: 'Sun Hat',
          description: 'Perfect for hot weather',
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
          description: 'Perfect for rainy weather',
        },
        {
          image: '../../../assets/homepage/rainy/Closetlycloth8.png',
          title: 'Waterproof Boots',
          description: 'Perfect for rainy weather',
        },
        {
          image: '../../../assets/homepage/rainy/Closetlycloth9.png',
          title: 'Hat',
          description: 'Perfect for rainy weather',
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
          description: 'Perfect for cold weather',
        },
        {
          image: '../../../assets/homepage/cold/Closetlycloth11.png',
          title: 'Long Pants',
          description: 'Perfect for cold weather',
        },
        {
          image: '../../../assets/homepage/cold/Closetlycloth12.png',
          title: 'Closed Shoes',
          description: 'Perfect for cold weather',
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
    // Register the icons used in the template
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

  // Navigate back to home page
  goBack() {
    this.router.navigate(['/home']);
  }

  // Fetch weather data from API using coordinates
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

  // Determine weather category based on temperature and condition
  determineWeatherCategory(temperature: number, condition: string): string {
    // First check for rain condition
    const rainConditions = ['Rain', 'Drizzle', 'Thunderstorm', 'Mist', 'Fog'];
    if (rainConditions.some((cond) => condition.includes(cond))) {
      return 'Rainy';
    }

    // Then check temperature
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

  // Update UI with real weather data
  updateWeatherUI(data: any) {
    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const condition = data.weather[0].main;

    // Try to get a more specific location name if available
    let cityName = data.name;
    if (cityName === '' || !cityName) {
      cityName = 'Davao de Oro';
    }

    // Get weather category
    const weatherCategory = this.determineWeatherCategory(
      temperature,
      condition,
    );

    // Set current weather (this never changes with category clicks)
    this.currentWeather = {
      temperature: `${temperature}°C`,
      condition: weatherCategory,
      feelsLike: `Feels like ${feelsLike}°C`,
      city: cityName,
      category: weatherCategory,
    };

    // Set selected category to match current weather initially
    this.selectedCategory = weatherCategory;

    // Update forecast banner (based on actual weather only)
    this.updateForecastBanner(weatherCategory);

    // Load outfit suggestions for current weather
    this.loadOutfitForCategory(weatherCategory);
  }

  // Update forecast banner based on actual weather
  updateForecastBanner(category: string) {
    this.forecastBackground =
      this.forecastBackgrounds[category] || this.forecastBackgrounds['Sunny'];
    this.forecastIcon = this.forecastIcons[category] || 'partly-sunny-outline';
  }

  // Load outfit for selected category
  loadOutfitForCategory(category: string) {
    let suggestion = this.outfitSuggestions[category];

    // Fallback to Sunny if category not found
    if (!suggestion) {
      suggestion = this.outfitSuggestions['Sunny'];
    }

    this.currentOutfit = suggestion.items;
  }

  // Handle category button click - only changes outfit display, NOT weather forecast
  onCategoryClick(category: string) {
    this.selectedCategory = category;
    this.loadOutfitForCategory(category);
  }

  // Save outfit with modern pill-style alert
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
  }

  // Fallback mock data if API fails
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

  // Refresh weather
  refreshWeather() {
    this.getWeatherData();
  }
}
