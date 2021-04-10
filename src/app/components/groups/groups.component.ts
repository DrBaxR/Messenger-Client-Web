import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Group } from 'src/app/data-models/group';
import { User } from 'src/app/data-models/user';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnChanges {

  currentUser: User;

  @Input('user') user: User;
  @Input('groupId') groupId: string;
  @Input('userGroups') userGroups: Group[];

  @Output() newGroupEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.userGroups) {
      if (this.userGroups) {
        this.newGroupEvent.emit(this.userGroups[0].id);
      }
    }
  }

  changeGroup(group: string) {
    this.newGroupEvent.emit(group);
  }

}
