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
  @Input('groupUsers') groupUsers: User[];
  @Input('userGroups') userGroups: Group[];

  @Output() newGroupEvent = new EventEmitter<string>();

  groups: Group[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUserGroups(this.user.id).subscribe(group => {
      this.groups = group;
      
    })
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  changeGroup(group: string)
  {
    this.newGroupEvent.emit(group);
  }

}
