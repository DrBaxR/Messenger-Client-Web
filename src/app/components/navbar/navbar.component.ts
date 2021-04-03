import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/data-models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  collapsed=true;
  user: User;
  constructor() { }

  ngOnInit(): void {
  }
  logout(){
    
  }

}
