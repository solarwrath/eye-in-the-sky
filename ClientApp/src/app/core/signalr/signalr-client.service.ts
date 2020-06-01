import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as signalR from '@microsoft/signalr';
import {HubConnection} from '@microsoft/signalr';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducers';
import {insertCampus} from '../store/campus/campus.actions';
import {getCampusByTitle} from '../store/campus/campus.selectors';
import {insertFloor} from '../store/floor/floor.actions';
import {getFloorByTitle} from '../store/floor/floor.selectors';
import {insertRoom} from '../store/room/room.actions';
import {getRoomByTitle} from '../store/room/room.selectors';
import {setPCData} from '../store/pc/pc.actions';
import {DataRecord} from '../models/data-record.model';
import SignUpStatus from '../models/sign-up-status.enum';
import {Data} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignalRClientService {
  private static readonly HUB_URL = '/hardwareInfo';

  private wholeState: AppState;

  constructor(
    private store: Store<AppState>,
  ) {
    this.store.subscribe(state => {
      this.wholeState = state;
    });
  }

  connection: HubConnection;

  private addDataRecord(dataRecord: DataRecord) {
    console.log('addDataRecord');
    const campusTitle = dataRecord.Campus;
    this.store.dispatch(insertCampus({campusTitle}));

    const campusWithSuchTitle = getCampusByTitle(this.wholeState, campusTitle);
    const floorTitle = dataRecord.Floor;
    this.store.dispatch(insertFloor({floorTitle, campusId: campusWithSuchTitle.id}));

    const floorWithSuchTitle = getFloorByTitle(this.wholeState, floorTitle);
    const roomTitle = dataRecord.Room;
    this.store.dispatch(insertRoom({roomTitle, floorId: floorWithSuchTitle.id}));

    const roomWithSuchTitle = getRoomByTitle(this.wholeState, roomTitle);
    this.store.dispatch(setPCData({
      roomId: roomWithSuchTitle.id,
      data: dataRecord,
    }));
  }

  public startConnection(): void {
    this.connection = new signalR.HubConnectionBuilder().withUrl(SignalRClientService.HUB_URL).build();

    this.connection.on('addDataRecord', (dataRecordJSON: string) => this.addDataRecord(JSON.parse(dataRecordJSON)));
    this.connection.on('addDataRecords', (dataRecordArrayJSON: string) => {
      (JSON.parse(dataRecordArrayJSON) as DataRecord[]).forEach(dataRecord => this.addDataRecord(dataRecord));
    });

    this.connection.start()
      .then(() => {
        this.connection.send('RegisterClient');
      })
      .catch(err => console.log(err));
  }

  public checkIdentity(username: string, password: string): Observable<boolean> {
    this.connection.send('TryLoginUser', username, password);

    return new Observable<boolean>((obs) => {
      this.connection.on('LoginResult', (signInResult) => {
        this.connection.off('LoginResult');
        obs.next(signInResult);
        obs.complete();
      });
    });
  }

  public signUp(username: string, password: string): Observable<boolean> {
    this.connection.send('TryRegisterUser', username, password);

    return new Observable<boolean>((obs) => {
      this.connection.on('SignUpResult', (signUpResult) => {
        this.connection.off('SignUpResult');
        obs.next(signUpResult);
        obs.complete();
      });
    });
  }
}
