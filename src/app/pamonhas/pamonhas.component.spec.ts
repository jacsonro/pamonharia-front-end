import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PamonhasComponent } from './pamonhas.component';

describe('PamonhasComponent', () => {
  let component: PamonhasComponent;
  let fixture: ComponentFixture<PamonhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PamonhasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PamonhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
