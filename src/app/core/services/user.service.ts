import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getLogInUser() {
    const logInUserAPI = environment.URL + '/api/users/self';
    return this.http.get<User>(logInUserAPI).pipe(
      map((loginUser) => {
        localStorage.setItem('loginUser', JSON.stringify(loginUser));
        console.log('user logged', loginUser);
        return loginUser;
      })
    );
  }

  getActiveLogInUser() {
    const loginUser = localStorage.getItem('loginUser');

    if (loginUser) return JSON.parse(loginUser);
  }}
