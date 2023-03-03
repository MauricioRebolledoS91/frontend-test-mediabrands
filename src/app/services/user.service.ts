import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$ = new Subject<any>();
myAppUrl = 'https://localhost:7106/';
myApiUrl = 'api/User'
  constructor(private http: HttpClient) { }

  getUserList() : Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + '/GetAllUsers');
  }

  deleteUser(id: string) : Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  saveUser(user: user) : Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, user);
  }

  updateUser(id: string, user: user) : Observable<any>{
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${id}`, user);
  }

  addUserEdit(user: user){
    this.user$.next(user);
  }

  getUserEdit(): Observable<user>{
    return this.user$.asObservable();
  }
}
