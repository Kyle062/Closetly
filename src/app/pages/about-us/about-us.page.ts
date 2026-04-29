import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  optionsOutline,
  sunnyOutline,
  shuffleOutline,
  calendarOutline,
  briefcaseOutline,
  personOutline,
  mailOutline,
  callOutline,
  locationOutline,
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoGithub,
} from 'ionicons/icons';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, BottomNavComponent, CommonModule, FormsModule],
})
export class AboutUsPage implements OnInit {
  constructor(private router: Router) {
    addIcons({
      arrowBackOutline,
      optionsOutline,
      sunnyOutline,
      shuffleOutline,
      calendarOutline,
      briefcaseOutline,
      personOutline,
      mailOutline,
      callOutline,
      locationOutline,
      logoFacebook,
      logoInstagram,
      logoTwitter,
      logoGithub,
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/profile']);
  }

  openEmail() {
    window.open('mailto:KyleAlab79@gmail.com');
  }
}
