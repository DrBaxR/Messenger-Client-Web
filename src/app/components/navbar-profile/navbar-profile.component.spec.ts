import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarProfileComponent } from './navbar-profile.component';

describe('NavbarProfileComponent', () => {
  let component: NavbarProfileComponent;
  let fixture: ComponentFixture<NavbarProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
