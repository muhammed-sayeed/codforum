import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitymembersComponent } from './communitymembers.component';

describe('CommunitymembersComponent', () => {
  let component: CommunitymembersComponent;
  let fixture: ComponentFixture<CommunitymembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunitymembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunitymembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
