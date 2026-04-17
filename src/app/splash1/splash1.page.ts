import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash1',
  template: `
    <ion-content class="splash1-bg">
      <div class="center-container">
        <div class="logo-wrapper">
          <img
            src="../../assets/closetlyLogo.png"
            alt="Closetly Logo"
            class="fade-in-logo"
          />
          <div class="logo-glow"></div>
        </div>
        <div class="loading-indicator">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </ion-content>
  `,
  styleUrls: ['./splash1.page.scss'],
  standalone: true,
  imports: [IonContent],
})
export class Splash1Page implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('/splash4');
    }, 3000);
  }
}
