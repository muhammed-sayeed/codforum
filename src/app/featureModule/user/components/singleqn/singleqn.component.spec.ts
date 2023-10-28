import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleqnComponent } from './singleqn.component';

describe('SingleqnComponent', () => {
  let component: SingleqnComponent;
  let fixture: ComponentFixture<SingleqnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleqnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleqnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
