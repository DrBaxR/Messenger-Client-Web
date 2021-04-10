import { Component, OnInit } from '@angular/core';
import { User } from './data-models/user';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'messenger';

  user: User = null;

  constructor (
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.apiService.initLoggedUser();

    this.apiService.loggedUser$.asObservable().subscribe(user => this.user = user);
  }
}
