import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../model/user.class';

@Injectable({
  providedIn: 'root'  
})
export class UserService {
  url: string = 'http://localhost:51333/api/User'

  constructor(
    private http: HttpClient
  ) { }

  loginPost(u: User): Observable<User>{
    return this.http.post(this.url + '/login', u) as Observable<User>;
  }
  list(): Observable<User[]> {
    return this.http.get(this.url) as Observable<User[]>;
  }

  get(id: number): Observable<User> {
    return this.http.get(this.url + "/" + id) as Observable<User>;
  }

  create(user: User): Observable<any> {
    console.log(user.phone);
    return this.http.post(this.url, user) as Observable<any>;
  }

  edit( user: User): Observable<any> {
    return this.http.put(this.url + '/' + user.id, user) as Observable<any>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
