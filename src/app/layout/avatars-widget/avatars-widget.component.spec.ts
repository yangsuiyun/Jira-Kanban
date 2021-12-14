import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarsWidgetComponent } from './avatars-widget.component';

describe('AvatarsWidgetComponent', () => {
  let component: AvatarsWidgetComponent;
  let fixture: ComponentFixture<AvatarsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
