import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  @Output() userAddedToGroup = new EventEmitter<{ email: string, groupId: string }>();
  @Output() groupDeleted = new EventEmitter<string>();

  @ViewChild('popover') popover: NgbPopover;
  @ViewChild('popoverUser') popoverUser: NgbPopover;

  groupNameInput: FormControl;
  isGroupErrorVisible = false;
  userEmailInput: FormControl;
  isEmailErrorVisible = false;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.groupNameInput = new FormControl('', Validators.required);
    this.userEmailInput = new FormControl('', Validators.required);
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
    if(this.groupNameInput.valid) {
      this.groupCreated.emit(this.groupNameInput.value);
      this.closePopover();
    } else {
      this.isGroupErrorVisible = true;
    }
  }

  closePopover() {
    this.groupNameInput.setValue('');
    this.popover.close();
    this.isGroupErrorVisible = false;
  }

  closePopoverAndCreateUser() {
    if(this.userEmailInput.valid) {
      this.userAddedToGroup.emit({ email: this.userEmailInput.value, groupId: this.groupId });
      this.closePopoverUser();
    } else {
      this.isEmailErrorVisible = true;
    }
  }

  closePopoverUser() {
    this.userEmailInput.setValue('');
    this.popoverUser.close();
    this.isEmailErrorVisible = false;
  }

  onGroupDeleted() {
    this.groupDeleted.emit(this.groupId);
  }
}
