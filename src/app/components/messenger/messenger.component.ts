import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  user$: Observable<User>;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    // for testing only
    this.groupId = '60632badcce5483f5b666fc3';

    this.groupUsers$ = this.apiService.getGroupUsers(this.groupId);
    this.user$ = this.apiService.getLoggedUser();
  }

}
