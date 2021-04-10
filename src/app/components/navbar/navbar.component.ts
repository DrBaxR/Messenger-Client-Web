import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {

  @Input() user: User = null;

  collapsed=true;
  loggedUser$: Observable<User>;


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem("user")) as User;

    if(!user) {
      this.loggedUser$ = this.apiService.getLoggedUser();
    } else {
      this.loggedUser$ = of(user);
    }
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.user) {
      console.log(this.user);
    }
  }

}
