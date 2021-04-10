import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.scss']
})
export class ProfileDisplayComponent implements OnInit, OnChanges {
  @Input('user') user: User;

  username: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.user) {
      console.log(localStorage.getItem('user'));
    }
  }

  saveProfile(username: string){
    this.apiService.updateUser(this.user.id, username).subscribe();

  }
}
