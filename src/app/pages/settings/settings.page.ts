import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonToggle } from '@ionic/angular/standalone'; // Add IonToggle

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonToggle, CommonModule, FormsModule] // Add to imports
})
export class SettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}