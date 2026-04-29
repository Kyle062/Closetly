import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

interface ClothingItem {
  image: string;
  alt: string;
  width?: string;
  height?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down';
  customClass?: string;
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
  weatherData: any = {
    temperature: '--',
    condition: 'Loading...',
    icon: 'cloudy-outline',
    city: 'Davao de Oro',
    feelsLike: '--',
  };

  isLoading: boolean = true;
  weatherError: string = '';

 currentSuggestion: any = {
    title: "Today's Suggestion",
    description: 'Loading suggestion...',
    clothes: [
      {
        image: '../../../assets/homepage/sunny/cloth1.png',  // Use existing image
        alt: 'Clothing item 1',
        width: 'auto',
        height: '180px',
        objectFit: 'contain',
      },
      {
        image: '../../../assets/homepage/sunny/cloth2.png',  // Use existing image
        alt: 'Clothing item 2',
        width: 'auto',
        height: '180px',
        objectFit: 'contain',
      },
      {
        image: '../../../assets/homepage/sunny/cloth4.png',  // Use existing image
        alt: 'Clothing item 3',
        width: 'auto',
        height: '180px',
        objectFit: 'contain',
      },
      {
        image: '../../../assets/homepage/sunny/shoes.png',  // Use existing image
        alt: 'Clothing item 4',
        width: 'auto',
        height: '180px',
        objectFit: 'contain',
      },
      {
        image: '../../../assets/homepage/sunny/accessory.png',  // Use existing image
        alt: 'Clothing item 5',
        width: 'auto',
        height: '180px',
        objectFit: 'contain',
      },
    ],
  };

  private apiKey = '35efb00415742337258dd1ba28238572';
  private lat = 7.68333;
  private lon = 126.11667;
  private apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`;

  private outfitSuggestions = {
    Sunny: {
      title: '☀️ Sunny Day Outfit',
      description:
        "Light & Breezy Summer Look - Perfect for Davao de Oro's sunny weather!",
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
        {
          image: '../../../assets/homepage/sunny/shoes.png',
          alt: 'Sandals',
          width: '95px',
          height: '130px',
          objectFit: 'contain' as const,
          customClass: 'sunny-shoes',
        },
        {
          image: '../../../assets/homepage/sunny/accessory.png',
          alt: 'Watch',
          width: '85px',
          height: '110px',
          objectFit: 'contain' as const,
          customClass: 'sunny-watch',
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
        {
          image: '../../../assets/homepage/hot/shoes.png',
          alt: 'Flip flops',
          width: '95px',
          height: '130px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/hot/accessory.png',
          alt: 'Sunglasses',
          width: '85px',
          height: '110px',
          objectFit: 'contain' as const,
        },
      ],
    },
    Rainy: {
      title: '☔ Rainy Day Ready',
      description: 'Stay Dry & Fashionable in the Rain',
      clothes: [
        {
          image: '../../../assets/homepage/rainy/Closetlycloth7.png',
          alt: 'Raincoat',
          width: '120px',
          height: '170px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/rainy/Closetlycloth8.png',
          alt: 'Waterproof boots',
          width: '100px',
          height: '140px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/rainy/Umbrella.png',
          alt: 'Umbrella',
          width: '95px',
          height: '130px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/rainy/Closetlycloth9.png',
          alt: 'Rain boots',
          width: '100px',
          height: '140px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/rainy/Waterproof bag.png',
          alt: 'Waterproof bag',
          width: '90px',
          height: '120px',
          objectFit: 'contain' as const,
        },
      ],
    },
    Cold: {
      title: '❄️ Cool Weather Comfort',
      description: 'Cozy & Warm Layered Look',
      clothes: [
        {
          image: '../../../assets/homepage/cold/Closetlycloth10.png',
          alt: 'Jacket',
          width: '115px',
          height: '165px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/cold/Closetlycloth11.png',
          alt: 'Long pants',
          width: '105px',
          height: '155px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/cold/Closetlycloth12.png',
          alt: 'Closed shoes',
          width: '100px',
          height: '140px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/cold/scarf.png',
          alt: 'Scarf',
          width: '90px',
          height: '120px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/cold/gloves.png',
          alt: 'Gloves',
          width: '85px',
          height: '110px',
          objectFit: 'contain' as const,
        },
      ],
    },
    default: {
      title: "Today's Suggestion",
      description: 'Street Wear & Comfortable',
      clothes: [
        {
          image: '../../../assets/homepage/Comfortable/Closetlycloth13.png',
          alt: 'Casual top',
          width: '110px',
          height: '160px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/Comfortable/Closetlycloth14.png',
          alt: 'Jeans',
          width: '105px',
          height: '155px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/Comfortable/Closetlycloth15.png',
          alt: 'Sneakers',
          width: '100px',
          height: '140px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/Comfortable/accessory1.png',
          alt: 'Watch',
          width: '85px',
          height: '110px',
          objectFit: 'contain' as const,
        },
        {
          image: '../../../assets/homepage/Comfortable/accessory2.png',
          alt: 'Bag',
          width: '90px',
          height: '120px',
          objectFit: 'contain' as const,
        },
      ],
    },
  };

  constructor(private router: Router) {
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

  navigateToWeatherOutfit() {
    this.router.navigate(['/weather-outfit']);
  }

  navigateToRandomOutfit() {
    this.router.navigate(['/random-outfit']);
  }

  navigateToSearch() {
    this.router.navigate(['/explore']);
  }

  navigateToAddItem() {
    this.router.navigate(['/add-item']);
  }

  viewFullOutfit(){
    this.router.navigate(['/wardrobe']);
  }

  getClothingStyles(cloth: ClothingItem) {
    return {
      width: cloth.width || 'auto',
      height: cloth.height || 'auto',
      'object-fit': cloth.objectFit || 'contain',
    };
  }

  getClothingClass(cloth: ClothingItem): string {
    return cloth.customClass || '';
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
        this.updateOutfitSuggestion(data.main.temp, data.weather[0].main);
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Weather API Error:', error);
        this.weatherError = 'Unable to load weather data';
        this.isLoading = false;
        this.setMockWeatherData();
        this.updateOutfitSuggestion(28, 'Clear');
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
      city: cityName,
      icon: iconMap[weatherCategory] || 'partly-sunny-outline',
    };
  }

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

  setMockWeatherData() {
    this.weatherData = {
      temperature: '28°C',
      condition: 'Sunny',
      feelsLike: 'Feels like 30°C',
      city: 'Davao de Oro',
      icon: 'sunny-outline',
    };
  }

  refreshWeather() {
    this.getWeatherData();
  }
}
