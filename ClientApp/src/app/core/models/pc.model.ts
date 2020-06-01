import {DataRecord} from './data-record.model';

export class PC {
  private static nextId = 1;
  public id: number;

  constructor(
    public data: DataRecord,
    public roomId: number,
  ) {
    this.id = PC.nextId++;
  }
}
