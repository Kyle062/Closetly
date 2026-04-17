import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonCheckbox,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  personOutline,
  mailOutline,
  keyOutline,
  lockClosedOutline,
  eyeOffOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    IonCheckbox,
    IonText,
    CommonModule,
    FormsModule,
  ],
})
export class SignupPage implements OnInit {
  // Properties for two-way binding on the form
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  rememberMe = false;

  constructor(private router: Router) {
    // Register required icons
    addIcons({
      arrowBackOutline,
      personOutline,
      mailOutline,
      keyOutline,
      lockClosedOutline,
      eyeOffOutline,
    });
  }

  ngOnInit() {}

  // Navigation Methods
  goBack() {
    this.router.navigateByUrl('/splash4'); // Adjust back route as needed
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  // Action Methods
  onSignup() {
    console.log('Signup attempted with:', {
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      rememberMe: this.rememberMe,
    });
    // Add logic here (e.g., validate passwords match, API call)
  }

  signupWithGoogle() {
    console.log('Sign up with Google');
  }

  signupWithFacebook() {
    console.log('Sign up with Facebook');
  }
}
