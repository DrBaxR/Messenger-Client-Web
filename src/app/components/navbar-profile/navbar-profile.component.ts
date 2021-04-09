import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})
export class NavbarProfileComponent implements OnInit {

  @Input('user') user: User;
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }
  logout(){
    this.apiService.logout();
  }

}
