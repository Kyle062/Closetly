import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ADDED - Import Router
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash4',
  templateUrl: './splash4.page.html',
  styleUrls: ['./splash4.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    CommonModule,
    FormsModule,
  ],
})
export class Splash4Page implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  goToSignup() {
    this.router.navigateByUrl('/signup');
  }
}
