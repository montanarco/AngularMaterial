import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[]
  }

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._user = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable <User[]>{
    return this._user.asObservable();
  }

  loadAll() {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users';

    return this.http.get<User[]>(usersUrl)
      .subscribe(data => {
        this.dataStore.users = data;
        this._user.next(Object.assign({},this.dataStore).users)
      }, error => {
        console.log("Failed to fetch users");
      })
  }


  userById(id: number){
    return this.dataStore.users.find (x=> x.id == id);

  }

  addUser(user:User): Promise<User>{
    return new Promise ((resolver,reject)=>{
      user.id = this.dataStore.users.length +1;
      this.dataStore.users.push(user);
      this._user.next(Object.assign({},this.dataStore).users)
      resolver(user);
    });
  }
}
