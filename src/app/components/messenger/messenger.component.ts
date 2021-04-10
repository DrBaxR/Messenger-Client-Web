import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/data-models/group';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  groupId: string;
  user: User;
  userGroups$: Observable<Group[]>;
  groupUsers$: Observable<User[]>;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.loggedUser$.asObservable().subscribe(user => {
      this.user = user;

      if (user) {
        this.userGroups$ = this.apiService.getUserGroups(this.user?.id);
      }
    });
  }

  changeGroup(group: string) {
    this.groupId = group;
    if(this.groupId) {
      this.groupUsers$ = this.apiService.getGroupUsers(this.groupId);
    }
  }

}
