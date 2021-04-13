import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loggedUser$: Observable<User>;

  userProfile: User;

  successMessage = '';
  _success = new Subject<string>();
  alertTimeout = 3000;

  @ViewChild('successAlert', { static: false }) successAlert: NgbAlert;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if(id)
      this.apiService.getUser(id).subscribe(u => this.userProfile = u);
  
    const user = JSON.parse(localStorage.getItem("user")) as User;

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(this.alertTimeout)).subscribe(() => this.successAlert?.close());

    if(!user) {
      this.loggedUser$ = this.apiService.getLoggedUser();
    } else {
      this.loggedUser$ = of(user);
    }
  }

  onUsernameChanged(message: string) {
    this._success.next(message);
  }
}
