import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
export class ProfileDisplayComponent implements OnInit, OnChanges {
  @Input('user') user: User;

  @ViewChild('successAlert', { static: false }) successAlert: NgbAlert;
  successMessage = '';
  private _success = new Subject<string>();

  alertTimeout = 3000;
  username: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(this.alertTimeout)).subscribe(() => this.successAlert?.close());
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.user) {
      console.log(localStorage.getItem('user'));
    }
  }

  saveProfile(username: string){
    this.apiService.updateUser(this.user.id, username).subscribe(
      {
        next: user => {
          this._success.next(`Username for <b>${user.email}</b> was updated succesfully to: <b>${username}</b>.`)
        }
      }
    );
  }
}
