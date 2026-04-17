import { Component, OnInit } from '@angular/core';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonIcon,
  IonInput,
  IonAvatar,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  gridOutline,
  searchOutline,
  scanOutline,
  optionsOutline,
  cloudyOutline,
  shirtOutline,
  sunnyOutline,
  addOutline,
  thunderstormOutline,
  rainyOutline,
  snowOutline,
  partlySunnyOutline,
} from 'ionicons/icons';

// Interface for clothing item with custom dimensions
interface ClothingItem {
  image: string;
  alt: string;
  width?: string; // Custom width (e.g., '100px', '80%', 'auto')
  height?: string; // Custom height (e.g., '150px', 'auto')
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down'; // How the image fits
  customClass?: string; // Optional custom CSS class
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    BottomNavComponent,
    IonContent,
    IonIcon,
    IonInput,
    IonAvatar,
    IonButton,
    CommonModule,
  ],
})
export class HomePage implements OnInit {
  // Weather properties
  weatherData: any = {
    temperature: '--',
    condition: 'Loading...',
    icon: 'cloudy-outline',
    city: 'Davao City',
    feelsLike: '--',
  };

  isLoading: boolean = true;
  weatherError: string = '';

  // Outfit suggestion properties
  currentSuggestion: any = {
    title: "Today's Suggestion",
    description: 'Loading suggestion...',
    clothes: [
      {
        image: '../../../assets/homeplaceholders/cloth-placeholder.png',
        alt: 'Clothing item 1',
        width: 'auto',
        height: '180px',
        objectFit: 'contain',
      },
      {
        image: '../../../assets/homeplaceholders/cloth-placeholder.png',
        alt: 'Clothing item 2',
        width: 'auto',
        height: '180px',
        objectFit: 'contain',
      },
      {
        image: '../../../assets/homeplaceholders/cloth-placeholder.png',
        alt: 'Clothing item 3',
        width: 'auto',
        height: '180px',
        objectFit: 'contain',
      },
    ],
  };

  // Working API key for OpenWeatherMap
  private apiKey = '35efb00415742337258dd1ba28238572';
  private city = 'Davao City';
  private country = 'PH';
  private apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${this.apiKey}&units=metric`;

  // Outfit suggestions with individual image dimensions
  private outfitSuggestions = {
    Sunny: {
      title: '☀️ Sunny Day Outfit',
      description:
        "Light & Breezy Summer Look - Perfect for Davao's sunny weather!",
      clothes: [
        {
          image: '../../../assets/homepage/sunny/cloth1.png',
          alt: 'Summer top',
          width: '110px',
          height: '160px',
          objectFit: 'contain' as const,
          customClass: 'sunny-top',
        },
        {
          image: '../../../assets/homepage/sunny/cloth2.png',
          alt: 'Shorts',
          width: '100px',
          height: '150px',
          objectFit: 'contain' as const,
          customClass: 'sunny-shorts',
        },
        {
          image: '../../../assets/homepage/sunny/cloth4.png',
          alt: 'Sunglasses',
          width: '90px',
          height: '120px',
          objectFit: 'contain' as const,
          customClass: 'sunny-accessory',
        },
      ],
    },
    Hot: {
      title: '🔥 Hot Weather Style',
      description: 'Stay Cool & Protected from the Heat',
      clothes: [
        {
          image: '../../../assets/homepage/hot/cloth1.png',
          alt: 'Tank top',
          width: '110px',
          height: '160px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/hot/cloth2.png',
          alt: 'Linen pants',
          width: '100px',
          height: '150px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/hot/cloth3.png',
          alt: 'Hat',
          width: '90px',
          height: '120px',
          objectFit: 'contain' as const,
        },
      ],
    },
    Rainy: {
      title: '☔ Rainy Day Ready',
      description: 'Stay Dry & Fashionable in the Rain',
      clothes: [
        {
          image: '../../../assets/homepage/rainy/cloth1.png',
          alt: 'Raincoat',
          width: '120px',
          height: '170px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/rainy/cloth2.png',
          alt: 'Waterproof boots',
          width: '100px',
          height: '140px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/rainy/cloth3.png',
          alt: 'Umbrella',
          width: '95px',
          height: '130px',
          objectFit: 'contain' as const,
        },
      ],
    },
    Cold: {
      title: '❄️ Cool Weather Comfort',
      description: 'Cozy & Warm Layered Look',
      clothes: [
        {
          image: '../../../assets/homepage/cold/cloth1.png',
          alt: 'Jacket',
          width: '115px',
          height: '165px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/cold/cloth2.png',
          alt: 'Long pants',
          width: '105px',
          height: '155px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/cold/cloth3.png',
          alt: 'Closed shoes',
          width: '100px',
          height: '140px',
          objectFit: 'contain' as const,
        },
      ],
    },
    default: {
      title: "Today's Suggestion",
      description: 'Street Wear & Comfortable',
      clothes: [
        {
          image: '../../../assets/homepage/cloth1.png',
          alt: 'Casual top',
          width: '110px',
          height: '160px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/cloth2.png',
          alt: 'Jeans',
          width: '105px',
          height: '155px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/cloth3.png',
          alt: 'Sneakers',
          width: '100px',
          height: '140px',
          objectFit: 'contain' as const,
        },
      ],
    },
  };

  constructor() {
    addIcons({
      searchOutline,
      scanOutline,
      optionsOutline,
      cloudyOutline,
      sunnyOutline,
      shirtOutline,
      addOutline,
      gridOutline,
      thunderstormOutline,
      rainyOutline,
      snowOutline,
      partlySunnyOutline,
    });
  }

  ngOnInit() {
    this.getWeatherData();
  }

  // Get dynamic styles for each clothing item
  getClothingStyles(cloth: ClothingItem) {
    return {
      width: cloth.width || 'auto',
      height: cloth.height || 'auto',
      'object-fit': cloth.objectFit || 'contain',
    };
  }

  // Get custom class for clothing item
  getClothingClass(cloth: ClothingItem): string {
    return cloth.customClass || '';
  }

  // Fetch weather data from API for Davao City
  getWeatherData() {
    this.isLoading = true;

    fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Weather data unavailable');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Weather API Response:', data);
        this.updateWeatherUI(data);
        this.updateOutfitSuggestion(data.main.temp, data.weather[0].main);
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Weather API Error:', error);
        this.weatherError = 'Unable to load weather';
        this.isLoading = false;
        // Fallback to mock data if API fails
        this.setMockWeatherData();
        this.updateOutfitSuggestion(28, 'Clear');
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
    const city = data.name;

    // Get weather category for icon
    const weatherCategory = this.determineWeatherCategory(
      temperature,
      condition,
    );
    const iconMap: { [key: string]: string } = {
      Sunny: 'sunny-outline',
      Hot: 'sunny-outline',
      Rainy: 'rainy-outline',
      Cold: 'cloudy-outline',
    };

    this.weatherData = {
      temperature: `${temperature}°C`,
      condition: weatherCategory,
      feelsLike: `Feels like ${feelsLike}°C`,
      city: city,
      icon: iconMap[weatherCategory] || 'partly-sunny-outline',
    };
  }

  // Update outfit suggestion based on temperature
  updateOutfitSuggestion(temperature: number, condition: string) {
    const weatherCategory = this.determineWeatherCategory(
      temperature,
      condition,
    );

    let suggestion = this.outfitSuggestions['default'];

    if (weatherCategory === 'Sunny') {
      suggestion = this.outfitSuggestions['Sunny'];
    } else if (weatherCategory === 'Hot') {
      suggestion = this.outfitSuggestions['Hot'];
    } else if (weatherCategory === 'Rainy') {
      suggestion = this.outfitSuggestions['Rainy'];
    } else if (weatherCategory === 'Cold') {
      suggestion = this.outfitSuggestions['Cold'];
    }

    this.currentSuggestion = {
      title: suggestion.title,
      description: suggestion.description,
      clothes: suggestion.clothes,
    };
  }

  // Fallback mock data if API fails
  setMockWeatherData() {
    this.weatherData = {
      temperature: '28°C',
      condition: 'Sunny',
      feelsLike: 'Feels like 30°C',
      city: 'Davao City',
      icon: 'sunny-outline',
    };
  }

  // Refresh weather
  refreshWeather() {
    this.getWeatherData();
  }
}
