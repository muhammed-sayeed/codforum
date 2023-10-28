import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleartComponent } from './singleart.component';

describe('SingleartComponent', () => {
  let component: SingleartComponent;
  let fixture: ComponentFixture<SingleartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
