import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, arrowBackCircleOutline, arrowForwardCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-outfit-calendar',
  templateUrl: './outfit-calendar.page.html',
  styleUrls: ['./outfit-calendar.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, CommonModule, FormsModule]
})
export class OutfitCalendarPage implements OnInit {
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: { date: number | null, image?: string }[] = [];
  
  stats = [
    { value: '5', label: 'This Week', color: '#ff6b81' }, // Pinkish
    { value: '18', label: 'This Month', color: '#feca57' }, // Yellowish
    { value: '7', label: 'Day Streak', color: '#8d6e63' } // Brownish
  ];

  constructor() {
    // Register standalone Ionic icons
    addIcons({ arrowBackOutline, arrowBackCircleOutline, arrowForwardCircleOutline });
  }

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    // Offset for April 2026 mockup (1st is on a Saturday)
    for (let i = 0; i < 6; i++) {
      this.calendarDays.push({ date: null });
    }
    
    // Generate 30 days
    for (let i = 1; i <= 30; i++) {
      let imgUrl = undefined;
      
      // Inject placeholder images for specific dates
      if (i === 6) imgUrl = 'https://placehold.co/100x100/e0e0e0/555555?text=Img';
      if (i === 12) imgUrl = 'https://placehold.co/100x100/e0e0e0/555555?text=Img';
      if (i === 13) imgUrl = 'https://placehold.co/100x100/e0e0e0/555555?text=Img';
      if (i === 19) imgUrl = 'https://placehold.co/100x100/e0e0e0/555555?text=Img';
      if (i === 26) imgUrl = 'https://placehold.co/100x100/e0e0e0/555555?text=Img';

      this.calendarDays.push({ date: i, image: imgUrl });
    }
  }
}