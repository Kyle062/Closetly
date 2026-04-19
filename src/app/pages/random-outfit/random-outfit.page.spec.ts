import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RandomOutfitPage } from './random-outfit.page';

describe('RandomOutfitPage', () => {
  let component: RandomOutfitPage;
  let fixture: ComponentFixture<RandomOutfitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomOutfitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
