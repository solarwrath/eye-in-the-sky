import {Component, OnInit} from '@angular/core';
import {AppState} from '../../../../core/store/reducers';
import {Store} from '@ngrx/store';
import {PC} from '../../../../core/models/pc.model';

@Component({
  selector: 'app-pc-data-popup',
  templateUrl: './pc-data-popup.component.html',
  styleUrls: ['./pc-data-popup.component.scss']
})
export class PcDataPopupComponent implements OnInit {
  public selectedPc: PC | null = null;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store
      .select(state => state.pc.selectedPC)
      .subscribe(newSelectedPC => this.selectedPc = newSelectedPC);
  }
}
