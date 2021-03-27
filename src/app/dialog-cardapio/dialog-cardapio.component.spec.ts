import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCardapioComponent } from './dialog-cardapio.component';

describe('DialogCardapioComponent', () => {
  let component: DialogCardapioComponent;
  let fixture: ComponentFixture<DialogCardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCardapioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
