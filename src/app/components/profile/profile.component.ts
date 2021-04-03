import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggedUser: User;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getLoggedUser().subscribe(user => this.loggedUser = user);
  }

}
