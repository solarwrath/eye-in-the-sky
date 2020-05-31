import {Component, Input, OnInit} from '@angular/core';
import {PC} from '../../../core/models/pc.model';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
