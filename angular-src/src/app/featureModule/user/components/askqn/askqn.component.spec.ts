import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskqnComponent } from './askqn.component';

describe('AskqnComponent', () => {
  let component: AskqnComponent;
  let fixture: ComponentFixture<AskqnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskqnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskqnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
