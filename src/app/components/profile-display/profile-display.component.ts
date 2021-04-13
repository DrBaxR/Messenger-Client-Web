import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.scss']
})
export class ProfileDisplayComponent implements OnInit {
  @Input('user') user: User;
  @Input('otherUser') otherUser: User; 
  @Output() usernameChanged: EventEmitter<string> = new EventEmitter();

  username: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  saveProfile(username: string){
    this.apiService.updateUser(this.user.id, username).subscribe(
      {
        next: user => {
          this.usernameChanged.emit(`Username for <b>${user.email}</b> was successfully updated to <b>${username}</b>!`);
        }
      }
    );
  }
}
