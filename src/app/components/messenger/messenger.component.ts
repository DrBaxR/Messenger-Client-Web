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
  groupUsers$: Observable<User[]>;
  userGroups$: Observable<Group[]>;
  user$: Observable<User>;

  userData: User;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // for testing only
    this.groupId = '60632badcce5483f5b666fc3';

    //take the user for having the user id for getUserGroups call
    this.userData = JSON.parse(localStorage.getItem('user'));

    // this.userGroups$ = this.apiService.getUserGroups(this.userData.id);
    // this.groupUsers$ = this.apiService.getGroupUsers(this.groupId);
    this.user$ = this.apiService.getLoggedUser();
  }

  changeGroup(group: string)
  {
    this.groupId = group;

    //print to console the groupId to verify if eventEmitter works
    console.log(this.groupId);
  }

}
