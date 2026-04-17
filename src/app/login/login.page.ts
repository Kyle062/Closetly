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
  IonNote,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  personOutline,
  lockClosedOutline,
  eyeOffOutline,
  eyeOutline,
  logoGoogle,
  logoFacebook,
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    IonNote,
    IonText,
    CommonModule,
    FormsModule,
  ],
})
export class LoginPage implements OnInit {
  // Properties for two-way binding
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false; // ADDED: Property to track password visibility

  constructor(private router: Router) {
    // Register the icons
    addIcons({
      arrowBackOutline,
      personOutline,
      lockClosedOutline,
      eyeOffOutline,
      eyeOutline, // ADDED: Import eye outline icon
      logoGoogle,
      logoFacebook,
    });
  }

  ngOnInit() {}

  // Method to go back to previous page
  goBack() {
    this.router.navigateByUrl('/splash4');
  }

  // Method to navigate to signup
  goToSignup() {
    this.router.navigateByUrl('/signup');
  }

  // Method to handle login
  onLogin() {
    // Add your login logic here
    console.log(
      'Login attempted with:',
      this.email,
      this.password,
      this.rememberMe,
    );
    // Navigate to home page after successful login
    // this.router.navigateByUrl('/home');
  }

  // ADDED: Method to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Method for forgot password
  forgotPassword() {
    console.log('Forgot password clicked');
    // Navigate to forgot password page
    // this.router.navigateByUrl('/forgot-password');
  }

  // Social login methods
  loginWithGoogle() {
    console.log('Login with Google');
    // Add Google login logic
  }

  loginWithFacebook() {
    console.log('Login with Facebook');
    // Add Facebook login logic
  }
}
