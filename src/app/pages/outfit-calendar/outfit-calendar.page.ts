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
  chevronBackOutline,
  chevronForwardOutline,
  closeOutline,
  checkmarkCircle,
  radioButtonOffOutline,
  shirtOutline,
} from 'ionicons/icons';

interface CalendarDay {
  date: number | null;
  outfit?: {
    title: string;
    image: string;
    itemCount: number;
  };
}

interface Outfit {
  title: string;
  image: string;
  itemCount: number;
}

@Component({
  selector: 'app-outfit-calendar',
  templateUrl: './outfit-calendar.page.html',
  styleUrls: ['./outfit-calendar.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, BottomNavComponent, CommonModule, FormsModule],
})
export class OutfitCalendarPage implements OnInit {
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: CalendarDay[] = [];

  currentMonth = 'April';
  currentYear = 2026;
  currentMonthIndex = 3; // April = 3 (0-indexed)
  private months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  showOutfitModal = false;
  selectedDay: CalendarDay | null = null;

  stats = {
    thisWeek: 5,
    thisMonth: 18,
    streak: 7,
  };

  availableOutfits: Outfit[] = [
    {
      title: 'The Weston Comfort',
      image: '../../../assets/homepage/sunny/cloth1.png',
      itemCount: 3,
    },
    {
      title: 'Office Ready',
      image: '../../../assets/homepage/cold/Closetlycloth10.png',
      itemCount: 4,
    },
    {
      title: 'Date Night',
      image: '../../../assets/homepage/hot/cloth1.png',
      itemCount: 3,
    },
    {
      title: 'Weekend Vibes',
      image: '../../../assets/homepage/sunny/accessory.png',
      itemCount: 5,
    },
  ];

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      arrowBackOutline,
      optionsOutline,
      chevronBackOutline,
      chevronForwardOutline,
      closeOutline,
      checkmarkCircle,
      radioButtonOffOutline,
      shirtOutline,
    });
  }

  ngOnInit() {
    this.generateCalendar();
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

  previousMonth() {
    this.currentMonthIndex--;
    if (this.currentMonthIndex < 0) {
      this.currentMonthIndex = 11;
      this.currentYear--;
    }
    this.currentMonth = this.months[this.currentMonthIndex];
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonthIndex++;
    if (this.currentMonthIndex > 11) {
      this.currentMonthIndex = 0;
      this.currentYear++;
    }
    this.currentMonth = this.months[this.currentMonthIndex];
    this.generateCalendar();
  }

  generateCalendar() {
    this.calendarDays = [];

    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(
      this.currentYear,
      this.currentMonthIndex,
      1
    ).getDay();

    // Get number of days in month
    const daysInMonth = new Date(
      this.currentYear,
      this.currentMonthIndex + 1,
      0
    ).getDate();

    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      this.calendarDays.push({ date: null });
    }

    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      this.calendarDays.push({ date: i });
    }
  }

  // Single tap with confirmation for adding outfit
  onDayClick(day: CalendarDay) {
    if (!day.date) return;
    this.selectedDay = day;
    this.showOutfitModal = true;
  }

  closeOutfitModal() {
    this.showOutfitModal = false;
    this.selectedDay = null;
  }

  selectOutfitForDay(outfit: Outfit) {
    if (!this.selectedDay) return;
    this.selectedDay.outfit = outfit;
  }

  async saveOutfitToDay() {
    if (!this.selectedDay) return;
    if (!this.selectedDay.outfit) {
      const alert = await this.alertController.create({
        header: 'No Outfit Selected',
        message: 'Please select an outfit first.',
        mode: 'ios',
        cssClass: 'modern-pill-alert',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
    this.closeOutfitModal();
    this.stats.thisMonth++;
    console.log(
      'Outfit saved for day:',
      this.selectedDay.date,
      this.selectedDay.outfit.title
    );
  }

  removeOutfit() {
    if (!this.selectedDay) return;
    this.selectedDay.outfit = undefined;
    this.closeOutfitModal();
    if (this.stats.thisMonth > 0) this.stats.thisMonth--;
  }
}
