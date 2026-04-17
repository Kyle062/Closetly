import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonButton,
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
  logoFacebook, checkmarkCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
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
  showPassword: boolean = false;

  // Error message
  loginError: string = '';
  showCustomAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'error';

  // Default admin account
  private defaultAdmin = {
    username: 'admin',
    password: 'admin123',
  };

  constructor(private router: Router) {
    addIcons({checkmarkCircleOutline,arrowBackOutline,personOutline,lockClosedOutline,eyeOffOutline,eyeOutline,logoGoogle,logoFacebook,});

    // Initialize default admin account if not exists
    this.initializeDefaultAdmin();
  }

  ngOnInit() {}

  // Initialize default admin account
  initializeDefaultAdmin() {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const adminExists = existingUsers.some(
      (user: any) => user.username === this.defaultAdmin.username,
    );

    if (!adminExists) {
      existingUsers.push({
        username: this.defaultAdmin.username,
        email: 'admin@closetly.com',
        password: this.defaultAdmin.password,
        createdAt: new Date().toISOString(),
        isAdmin: true,
      });
      localStorage.setItem('users', JSON.stringify(existingUsers));
    }
  }

  // Show custom pill alert
  showAlert(message: string, type: 'success' | 'error' = 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.showCustomAlert = true;

    setTimeout(() => {
      this.showCustomAlert = false;
      this.alertMessage = '';
    }, 2000);
  }

  // Method to go back to previous page
  goBack() {
    this.router.navigateByUrl('/splash4');
  }

  // Method to navigate to signup
  goToSignup() {
    this.router.navigateByUrl('/signup');
  }

  // Method to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Method to handle login with validation
  onLogin() {
    this.loginError = '';

    // Check if fields are empty
    if (!this.email.trim()) {
      this.showAlert('Please enter username/email', 'error');
      return;
    }

    if (!this.password.trim()) {
      this.showAlert('Please enter password', 'error');
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user by username or email
    const user = users.find(
      (u: any) => u.username === this.email || u.email === this.email,
    );

    // Check if user exists and password matches
    if (user && user.password === this.password) {
      // Successful login
      console.log('Login successful for:', user.username);

      // Store current user session
      if (this.rememberMe) {
        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin || false,
          }),
        );
      } else {
        sessionStorage.setItem(
          'currentUser',
          JSON.stringify({
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin || false,
          }),
        );
      }

      // Show success message
      this.showAlert(`Welcome , ${user.username}!`, 'success');

      // Navigate to home page after short delay
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 1500);
    } else {
      // Failed login
      this.showAlert(
        'Invalid username/email or password. Please try again.',
        'error',
      );
    }
  }

  // Method for forgot password
  forgotPassword() {
    this.showAlert('Please contact support to reset your password', 'error');
  }

  // Social login methods
  loginWithGoogle() {
    this.showAlert('Google login coming soon!', 'error');
  }

  loginWithFacebook() {
    this.showAlert('Facebook login coming soon!', 'error');
  }
}
