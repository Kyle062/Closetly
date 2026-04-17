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
  eyeOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
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

  // Password visibility properties
  showPassword = false;
  showConfirmPassword = false;

  // Error message properties
  usernameError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';
  generalError = '';

  // Custom alert properties
  showCustomAlert = false;
  alertMessage = '';
  alertType: 'success' | 'error' = 'success';

  constructor(private router: Router) {
    addIcons({
      arrowBackOutline,
      personOutline,
      mailOutline,
      keyOutline,
      lockClosedOutline,
      eyeOffOutline,
      eyeOutline,
      checkmarkCircleOutline,
    });
  }

  ngOnInit() {}

  // Navigation Methods
  goBack() {
    this.router.navigateByUrl('/splash4');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  // Show custom pill alert
  showAlert(message: string, type: 'success' | 'error' = 'success') {
    this.alertMessage = message;
    this.alertType = type;
    this.showCustomAlert = true;

    setTimeout(() => {
      this.hideAlert();
    }, 2000);
  }

  hideAlert() {
    this.showCustomAlert = false;
    this.alertMessage = '';
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Validation Methods
  validateForm(): boolean {
    let isValid = true;

    // Clear previous errors
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
    this.generalError = '';

    // Validate Username
    if (!this.username.trim()) {
      this.usernameError = 'Username is required';
      isValid = false;
    } else if (this.username.length < 3) {
      this.usernameError = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email.trim()) {
      this.emailError = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(this.email)) {
      this.emailError = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate Password
    if (!this.password) {
      this.passwordError = 'Password is required';
      isValid = false;
    } else if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Validate Confirm Password
    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Please confirm your password';
      isValid = false;
    } else if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match';
      isValid = false;
    }

    return isValid;
  }

  // Signup Method - Save user to localStorage
  onSignup() {
    if (this.validateForm()) {
      // Check if username already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.some(
        (user: any) => user.username === this.username,
      );

      if (userExists) {
        this.showAlert(
          'Username already exists! Please choose another.',
          'error',
        );
        return;
      }

      // Create new user object
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Store current user if remember me is checked
      if (this.rememberMe) {
        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            username: this.username,
            email: this.email,
          }),
        );
      }

      // Show success alert
      this.showAlert(
        'Registration successful! Redirecting to login...',
        'success',
      );

      // Navigate to login after alert
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 2000);
    } else {
      this.showAlert('Please fix the errors above', 'error');
    }
  }

  // Social login methods
  signupWithGoogle() {
    this.showAlert('Google signup coming soon!', 'error');
  }

  signupWithFacebook() {
    this.showAlert('Facebook signup coming soon!', 'error');
  }
}
