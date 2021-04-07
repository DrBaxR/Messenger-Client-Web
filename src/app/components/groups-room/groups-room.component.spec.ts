import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsRoomComponent } from './groups-room.component';

describe('GroupsRoomComponent', () => {
  let component: GroupsRoomComponent;
  let fixture: ComponentFixture<GroupsRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
