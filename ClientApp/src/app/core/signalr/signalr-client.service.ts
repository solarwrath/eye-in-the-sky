import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as signalR from '@microsoft/signalr';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducers';
import { insertCampus} from '../store/campus/campus.actions';
import {getCampusByTitle} from '../store/campus/campus.selectors';
import {insertFloor} from '../store/floor/floor.actions';
import {getFloorByTitle} from '../store/floor/floor.selectors';
import {insertRoom} from '../store/room/room.actions';
import {getRoomByTitle} from '../store/room/room.selectors';
import {setPCData} from '../store/pc/pc.actions';
import {CollectedData} from './collected-data-model';

@Injectable({
  providedIn: 'root'
})
export class SignalRClientService {
  private static readonly HUB_URL = '/hardwareInfo';

  private users: Map<string, string>;
  private wholeState: AppState;

  constructor(
    private store: Store<AppState>,
  ) {
    this.store.subscribe(state => {
      this.wholeState = state;
    });

    this.users = new Map<string, string>();
    this.users.set('admin', 'test');
  }

  public startConnection(): void {
    const connection = new signalR.HubConnectionBuilder().withUrl(SignalRClientService.HUB_URL).build();

    connection.on('addPCData', (collectedDataJSON: string) => {
      const collectedData: CollectedData = JSON.parse(collectedDataJSON);

      const campusTitle = collectedData.ClientInfo.Campus;
      this.store.dispatch(insertCampus({campusTitle}));

      const campusWithSuchTitle = getCampusByTitle(this.wholeState, campusTitle);
      const floorTitle = collectedData.ClientInfo.Floor;
      this.store.dispatch(insertFloor({floorTitle, campusId: campusWithSuchTitle.id}));

      const floorWithSuchTitle = getFloorByTitle(this.wholeState, floorTitle);
      const roomTitle = collectedData.ClientInfo.Room;
      this.store.dispatch(insertRoom({roomTitle, floorId: floorWithSuchTitle.id}));

      const roomWithSuchTitle = getRoomByTitle(this.wholeState, roomTitle);
      this.store.dispatch(setPCData({
        roomId: roomWithSuchTitle.id,
        data: {
          averageCPULoad: collectedData.ClientInfo.HardwareInfo.averageCPULoad,
          cpuLoad: collectedData.ClientInfo.HardwareInfo.cpuLoad,
          clientName: collectedData.ClientInfo.ClientName,
          timeStamp: collectedData.DateTime
        }
      }));
    });

    connection.start()
      .then(() => {
        connection.send('RegisterClient');
      })
      .catch(err => console.log(err));
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
