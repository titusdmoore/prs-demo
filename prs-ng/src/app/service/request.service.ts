import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Request } from '@model/request.class'

@Injectable({
  providedIn: 'root'  
})
export class RequestService {
  url: string = 'http://localhost:51333/api/Request'

  constructor(
    private http: HttpClient
  ) { }


  list(): Observable<Request[]> {
    return this.http.get(this.url) as Observable<Request[]>;
  }

  get(id: number): Observable<Request> {
    return this.http.get(this.url + "/" + id) as Observable<Request>;
  }

  create(Request: Request): Observable<any> {
    return this.http.post(this.url, Request) as Observable<any>;
  }

  edit( Request: Request): Observable<any> {
    return this.http.put(this.url + '/' + Request.id, Request) as Observable<any>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
  setReview(id: number): Observable<any> {
    return this.http.get('http://localhost:51333/api/SetRev/' + id);
  }
  setApproved(id: number){
    return this.http.get('http://localhost:51333/api/SetApp/' + id);
  }
  setRej(id: number){
    return this.http.get('http://localhost:51333/api/SetRej/' + id);
  }
  getRev(): Observable<Request[]> {
    return this.http.get(this.url + '/review') as Observable<Request[]>;
  }
}
