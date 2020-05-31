import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {PC} from '../../../core/models/pc.model';
import {MatDialog} from '@angular/material/dialog';
import {PcDataPopupComponent} from './pc-data-popup/pc-data-popup.component';
import {selectPC} from '../../../core/store/pc/pc.actions';
import {AppState} from '../../../core/store/reducers';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-pc-data',
  templateUrl: './pc-data.component.html',
  styleUrls: ['./pc-data.component.scss']
})
export class PcDataComponent implements OnInit {
  @Input()
  public pc: PC;

  @Input()
  public selected: boolean;

  constructor(
    private hostElementRef: ElementRef<HTMLElement>,
    private dialog: MatDialog,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    console.log(this.pc);
    this.hostElementRef.nativeElement.classList.add(this.pc.generalHealthStatus.toLowerCase());
    console.log(this.hostElementRef.nativeElement.classList);
  }

  @HostListener('click')
  onSelectedPc(): void {
    this.store.dispatch(selectPC({pc: this.pc}));
    this.dialog.open(PcDataPopupComponent);
  }
}
