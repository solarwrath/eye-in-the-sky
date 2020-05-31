import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRClientService {
  private users: Map<string, string>;

  constructor() {
    this.users = new Map<string, string>();
    this.users.set('admin', 'test');
  }

  public checkIdentity(username: string, password: string): Observable<boolean> {
    // TODO ACTUAL CODE
    console.log(`checking for: ${username}: ${password}`);
    return new Observable<boolean>((obs) => {
      setTimeout(() => {
        const userPassword = this.users.get(username);
        obs.next(userPassword !== undefined && userPassword === password);
        obs.complete();
      }, 2500);
    });
  }

  public signUp(username: string, password: string): Observable<boolean> {
    // TODO ACTUAL CODE
    console.log(`signing up for: ${username}: ${password}`);
    return new Observable<boolean>((obs) => {
      setTimeout(() => {
        this.users.set(username, password);
        obs.next(true);
        obs.complete();
      }, 2500);
    });
  }
}
