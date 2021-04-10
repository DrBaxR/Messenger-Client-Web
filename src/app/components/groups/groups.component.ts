import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Group } from 'src/app/data-models/group';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnChanges {
  @Input('user') user: User;
  @Input('groupId') groupId: string;
  @Input('userGroups') userGroups: Group[];

  @Output() newGroupEvent = new EventEmitter<string>();
  @Output() groupCreated = new EventEmitter<string>();

  @ViewChild('popover') popover: NgbPopover;

  groupNameInput: FormControl;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.groupNameInput = new FormControl('');
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

  closePopoverAndCreateGroup() {
    this.groupCreated.emit(this.groupNameInput.value);
    this.groupNameInput.setValue('');
    this.popover.close();
  }

  closePopover() {
    this.groupNameInput.setValue('');
    this.popover.close();
  }

}
