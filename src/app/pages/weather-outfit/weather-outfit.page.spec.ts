import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherOutfitPage } from './weather-outfit.page';

describe('WeatherOutfitPage', () => {
  let component: WeatherOutfitPage;
  let fixture: ComponentFixture<WeatherOutfitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherOutfitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
