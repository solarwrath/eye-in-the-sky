import {Component, OnInit} from '@angular/core';
import {PC} from '../../../core/models/pc.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/store/reducers';
import {selectPC} from '../../../core/store/pc/pc.actions';
import {Observable} from 'rxjs';
import {getPCsOfSelectedRoom} from '../../../core/store/pc/pc.reducer';

@Component({
  selector: 'app-pc-grid',
  templateUrl: './pc-grid.component.html',
  styleUrls: ['./pc-grid.component.scss']
})
export class PcGridComponent implements OnInit {
  public selectedPC: PC | null = null;
  public pcs: Observable<PC[]> = this.store.select(getPCsOfSelectedRoom);

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store
      .select(state => state.pc.selectedPC)
      .subscribe(newSelectedPC => {
        this.selectedPC = newSelectedPC;
      });
  }

  public onSelectPC(event: any, pc: PC): void {
    this.store.dispatch(selectPC({pc}));
  }
}
