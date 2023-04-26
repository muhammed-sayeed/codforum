import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QnlistingComponent } from './qnlisting.component';

describe('QnlistingComponent', () => {
  let component: QnlistingComponent;
  let fixture: ComponentFixture<QnlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QnlistingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QnlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
