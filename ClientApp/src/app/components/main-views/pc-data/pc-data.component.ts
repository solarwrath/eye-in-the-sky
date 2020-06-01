import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {PC} from '../../../core/models/pc.model';
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
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.hostElementRef.nativeElement.classList.add(this.pc.data.GeneralHealthStatus.toLowerCase());
  }

  @HostListener('click')
  onSelectedPc(): void {
    this.store.dispatch(selectPC({pc: this.pc}));
  }
}
