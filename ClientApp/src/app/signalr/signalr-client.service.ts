import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRClientService {

  constructor() {
  }

  public checkIdentity(username: string, password: string): Observable<boolean> {
    console.log(`checking for: ${username}: ${password}`);
    return new Observable<boolean>((obs) => {
      setTimeout(() => {
        obs.next(true);
        obs.complete();
      }, 2500);
    });
  }
}
