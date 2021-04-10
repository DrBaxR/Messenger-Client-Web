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
  userGroups$: Observable<Group[]>;
  // user$: Observable<User>;
  user: User;

  userData: User;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // for testing only
    this.groupId = '60632badcce5483f5b666fc3';

    //take the user for having the user id for getUserGroups call
    this.apiService.loggedUser$.asObservable().subscribe(user => {
      this.user = user;

      if (user) {
        this.userGroups$ = this.apiService.getUserGroups(this.user?.id);
      }
    });

    // this.user$ = this.apiService.getLoggedUser();
  }

  changeGroup(group: string) {
    this.groupId = group;

    //print to console the groupId to verify if eventEmitter works
    console.log(this.groupId);
  }

}
