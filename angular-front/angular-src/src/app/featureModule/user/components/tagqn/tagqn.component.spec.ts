import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagqnComponent } from './tagqn.component';

describe('TagqnComponent', () => {
  let component: TagqnComponent;
  let fixture: ComponentFixture<TagqnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagqnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagqnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
