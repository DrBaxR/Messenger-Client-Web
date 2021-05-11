import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  _success: Subject<string>;
  _danger: Subject<string>;

  constructor() { 
    this._success = new Subject<string>();
    this._danger = new Subject<string>();
  }

  sendSuccess(message: string, delay = 0) {
    setTimeout(() => {
      this._success.next(message);
    }, delay);
  }

  sendDanger(message: string) {
    this._danger.next(message);
  }
}
