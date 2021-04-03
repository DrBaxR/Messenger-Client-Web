import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../data-models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:8080';
  websocketUrl = 'ws://localhost:8080/messenger';

  jwt: string = '';
  userId: string = '';
  loggedUser: User;

  private httpHeaders = {
    'Authorization': `Bearer ${this.jwt}`
  };

  constructor(private httpClient: HttpClient) { }

  getGroups() {
    return this.httpClient.get(`${this.apiUrl}/groups`,
      {
        headers: {
          'Authorization': `Bearer ${this.jwt}`
        }
      })
  }

  getLoggedUser() {
    return this.httpClient.get<User>(`${this.apiUrl}/users/${this.userId}`,
      {
        headers: {
          'Authorization': `Bearer ${this.jwt}`
        }
      })
  }

  signin(email: string, password: string) {
    const body = {
      email,
      password
    }

    const observable = this.httpClient.post(`${this.apiUrl}/api/auth/signin`, body);
    observable.subscribe(
      response => {
        const res = response as any;

        this.jwt = res.accessToken;
        this.userId = res.id;

        // this.getLoggedUser().subscribe(user => this.loggedUser = user);
      },
      error => console.error("Wrong credentials")
    );

    return observable;
  }

  signup(username: string, email: string, password: string) {
    const body = {
      username,
      email,
      password
    }

    return this.httpClient.post(`${this.apiUrl}/api/auth/signup`, body);
  }
}
