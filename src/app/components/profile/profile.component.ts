import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggedUser$: Observable<User>;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem("user")) as User;

    if(!user) {
      this.loggedUser$ = this.apiService.getLoggedUser();
    } else {
      this.loggedUser$ = of(user);
    }
  }

}
