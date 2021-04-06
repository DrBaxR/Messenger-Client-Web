import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/data-models/user';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.scss']
})
export class ProfileDisplayComponent implements OnInit, OnChanges {
  @Input('user') user: User;


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.user) {
      console.log(localStorage.getItem('user'));
    }
  }
}
