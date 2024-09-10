import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromPopupComponent } from './from-popup.component';

describe('FromPopupComponent', () => {
  let component: FromPopupComponent;
  let fixture: ComponentFixture<FromPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FromPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
