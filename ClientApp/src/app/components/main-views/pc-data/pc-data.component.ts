import {Component, ElementRef, Input, OnInit} from '@angular/core';
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

  constructor(private hostElementRef: ElementRef<HTMLElement>) {
  }

  ngOnInit(): void {
    console.log(this.pc);
    this.hostElementRef.nativeElement.classList.add(this.pc.generalHealthStatus.toLowerCase());
    console.log(this.hostElementRef.nativeElement.classList);
  }
}
