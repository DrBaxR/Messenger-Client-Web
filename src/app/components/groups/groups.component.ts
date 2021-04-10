import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/data-models/group';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  currentUser: User;

  @Input('user') user: User;
  @Input('groupId') groupId: string;
  @Input('userGroups') userGroups: Group[];

  @Output() newGroupEvent = new EventEmitter<string>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  changeGroup(group: string) {
    this.newGroupEvent.emit(group);
  }

}
