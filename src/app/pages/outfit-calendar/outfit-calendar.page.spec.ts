import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutfitCalendarPage } from './outfit-calendar.page';

describe('OutfitCalendarPage', () => {
  let component: OutfitCalendarPage;
  let fixture: ComponentFixture<OutfitCalendarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OutfitCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
