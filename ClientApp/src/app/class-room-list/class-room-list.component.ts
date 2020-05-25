import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import Typewriter from '../typewriter/typewriter';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducers';
import {getClassRoomsOfSelectedFloor} from '../store/class-room.reducer';
import {ClassRoom} from '../models/class-room.model';
import {deselectClassRoom, selectClassRoom} from '../store/class-room.actions';

@Component({
  selector: 'app-class-room-list',
  templateUrl: './class-room-list.component.html',
  styleUrls: ['./class-room-list.component.scss']
})
export class ClassRoomListComponent implements OnInit, AfterViewInit {
  public classRooms: Observable<ClassRoom[] | null> = this.store.select(getClassRoomsOfSelectedFloor);
  public selectedClassRoom: ClassRoom | null = null;

  @ViewChild('selectedClassRoomTitle')
  public selectedClassRoomTitleElement: ElementRef<HTMLSpanElement>;
  private typewriter: Typewriter | null = null;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store
      .select(state => state.classRoom.selectedClassRoom)
      .subscribe(newSelectedClassRoom => {
        this.selectedClassRoom = newSelectedClassRoom;
      });
  }

  ngAfterViewInit(): void {
    this.typewriter = new Typewriter({
      target: this.selectedClassRoomTitleElement.nativeElement,
      initialText: this.selectedClassRoom !== null ? this.selectedClassRoom.title : '',
      period: 1500,
      terminalText: '_'
    }, {
      animateAppearance: true,
    });

    this.store
      .select(state => state.classRoom.selectedClassRoom)
      .subscribe(newSelectedClassRoom => {
        this.typewriter.changeText(newSelectedClassRoom == null ? '' : newSelectedClassRoom.title);
      });
  }

  public onSelectClassRoom(event: any, classRoom: ClassRoom): void {
    this.store.dispatch(selectClassRoom({classRoom}));
  }

  public onDeselectClassRoom(): void {
    this.store.dispatch(deselectClassRoom());
  }
}
