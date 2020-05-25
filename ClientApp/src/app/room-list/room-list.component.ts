import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import Typewriter from '../typewriter/typewriter';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducers';
import {getRoomsOfSelectedFloor} from '../store/room.reducer';
import {Room} from '../models/room.model';
import {deselectRoom, selectRoom} from '../store/room.actions';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit, AfterViewInit {
  public rooms: Observable<Room[] | null> = this.store.select(getRoomsOfSelectedFloor);
  public selectedRoom: Room | null = null;

  @ViewChild('selectedRoomTitle')
  public selectedRoomTitleElement: ElementRef<HTMLSpanElement>;
  private typewriter: Typewriter | null = null;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store
      .select(state => state.room.selectedRoom)
      .subscribe(newSelectedRoom => {
        this.selectedRoom = newSelectedRoom;
      });
  }

  ngAfterViewInit(): void {
    this.typewriter = new Typewriter({
      target: this.selectedRoomTitleElement.nativeElement,
      initialText: this.selectedRoom !== null ? this.selectedRoom.title : '',
      period: 1500,
      terminalText: '_'
    }, {
      animateAppearance: true,
    });

    // Subscribing here and not in ngOnInit subscription to avoid checking typewriter on null
    this.store
      .select(state => state.room.selectedRoom)
      .subscribe(newSelectedRoom => {
        this.typewriter.changeText(newSelectedRoom == null ? '' : newSelectedRoom.title);
      });
  }

  public onSelectRoom(event: any, room: Room): void {
    this.store.dispatch(selectRoom({room}));
  }

  public onDeselectRoom(): void {
    this.store.dispatch(deselectRoom());
  }
}
