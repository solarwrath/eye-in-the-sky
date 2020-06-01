import {PCData} from './pc-data.model';

export class PC {
  private static nextId = 1;
  public id: number;

  constructor(
    public data: PCData,
    public roomId: number,
  ) {
    this.id = PC.nextId++;
  }
}
