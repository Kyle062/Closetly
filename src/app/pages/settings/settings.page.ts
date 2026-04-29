import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import {
  IonContent,
  IonIcon,
  IonToggle,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  optionsOutline,
  notificationsOutline,
  languageOutline,
  colorPaletteOutline,
  chevronForwardOutline,
  closeOutline,
  radioButtonOnOutline,
  radioButtonOffOutline,
  sunnyOutline,
  moonOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonToggle,
    BottomNavComponent,
    CommonModule,
    FormsModule,
  ],
})
export class SettingsPage implements OnInit {
  notificationEnabled = true;
  selectedLanguage = 'English';
  selectedTheme = 'Light';
  showLanguageModal = false;
  showThemeModal = false;

  languages = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Korean'];
  themes = ['Light', 'Dark'];

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({
      arrowBackOutline,
      optionsOutline,
      notificationsOutline,
      languageOutline,
      colorPaletteOutline,
      chevronForwardOutline,
      closeOutline,
      radioButtonOnOutline,
      radioButtonOffOutline,
      sunnyOutline,
      moonOutline,
    });
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/profile']);
  }

  toggleNotification() {
    this.notificationEnabled = !this.notificationEnabled;
    console.log(
      'Notifications:',
      this.notificationEnabled ? 'Enabled' : 'Disabled'
    );
  }

  // Language Modal
  openLanguageModal() {
    this.showLanguageModal = true;
  }

  closeLanguageModal() {
    this.showLanguageModal = false;
  }

  selectLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.closeLanguageModal();
  }

  // Theme Modal
  openThemeModal() {
    this.showThemeModal = true;
  }

  closeThemeModal() {
    this.showThemeModal = false;
  }

  selectTheme(theme: string) {
    this.selectedTheme = theme;
    this.closeThemeModal();
  }

  // Delete Account
  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Delete Account?',
      message:
        'This action cannot be undone. All your data will be permanently deleted.',
      mode: 'ios',
      cssClass: 'modern-pill-alert',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          cssClass: 'danger-button',
          handler: () => {
            console.log('Account deleted');
            // Navigate to login page after deleting account
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }
}
